from fastapi import APIRouter, HTTPException, Request, Header
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest
import razorpay
import hmac
import hashlib
import os
import logging
from models.payment import (
    PRICING_PACKAGES,
    PaymentTransaction,
    CreateCheckoutRequest,
    RazorpayOrderRequest,
    RazorpayVerifyRequest,
    CheckoutStatusResponse
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/payments", tags=["payments"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'sdwrite')
mongo_client = AsyncIOMotorClient(mongo_url)
db = mongo_client[db_name]

# Payment gateway clients
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')

# Initialize Razorpay client only if keys are available
razorpay_client = None
if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# ==================== STRIPE INTEGRATION ====================

@router.post("/stripe/create-checkout")
async def create_stripe_checkout(request: CreateCheckoutRequest):
    """Create Stripe checkout session"""
    try:
        # Validate package
        if request.package_id not in PRICING_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid package selected")
        
        package = PRICING_PACKAGES[request.package_id]
        
        # Enterprise requires custom contact
        if request.package_id == "enterprise":
            raise HTTPException(status_code=400, detail="Please contact sales for Enterprise plan")
        
        # Get amount from server-side (NEVER from frontend)
        amount = package[f"amount_{request.currency}"]
        if not amount:
            raise HTTPException(status_code=400, detail=f"Package not available in {request.currency}")
        
        # Create success and cancel URLs
        success_url = f"{request.origin_url}/payment-success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{request.origin_url}/payment-cancelled"
        
        # Initialize Stripe
        host_url = request.origin_url
        webhook_url = f"{host_url}/api/payments/stripe/webhook"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency=request.currency,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "package_id": request.package_id,
                "package_name": package["name"],
                "user_email": request.user_email or "guest"
            }
        )
        
        session = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create transaction record
        transaction = PaymentTransaction(
            session_id=session.session_id,
            package_id=request.package_id,
            package_name=package["name"],
            amount=amount,
            currency=request.currency.upper(),
            payment_gateway="stripe",
            payment_status="pending",
            user_email=request.user_email,
            metadata={
                "package_id": request.package_id,
                "package_name": package["name"]
            }
        )
        
        await db.payment_transactions.insert_one(transaction.dict())
        
        logger.info(f"Stripe checkout created: {session.session_id}")
        
        return {
            "url": session.url,
            "session_id": session.session_id,
            "payment_gateway": "stripe"
        }
        
    except Exception as e:
        logger.error(f"Stripe checkout error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stripe/status/{session_id}")
async def get_stripe_status(session_id: str):
    """Get Stripe payment status"""
    try:
        # Check if already processed
        existing = await db.payment_transactions.find_one(
            {"session_id": session_id, "payment_status": "paid"}
        )
        
        if existing:
            return CheckoutStatusResponse(
                status="complete",
                payment_status="paid",
                amount=existing["amount"],
                currency=existing["currency"],
                package_name=existing["package_name"],
                payment_gateway="stripe"
            )
        
        # Query Stripe
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
        checkout_status = await stripe_checkout.get_checkout_status(session_id)
        
        # Update transaction
        update_data = {
            "payment_status": checkout_status.payment_status,
            "status": checkout_status.status
        }
        
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": update_data}
        )
        
        transaction = await db.payment_transactions.find_one({"session_id": session_id})
        
        return CheckoutStatusResponse(
            status=checkout_status.status,
            payment_status=checkout_status.payment_status,
            amount=transaction["amount"],
            currency=transaction["currency"],
            package_name=transaction["package_name"],
            payment_gateway="stripe"
        )
        
    except Exception as e:
        logger.error(f"Stripe status error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    try:
        payload = await request.body()
        sig_header = request.headers.get("Stripe-Signature")
        
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
        webhook_response = await stripe_checkout.handle_webhook(payload, sig_header)
        
        # Update transaction based on webhook event
        if webhook_response.payment_status == "paid":
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id, "payment_status": {"$ne": "paid"}},
                {
                    "$set": {
                        "payment_status": "paid",
                        "payment_id": webhook_response.event_id
                    }
                }
            )
            logger.info(f"Payment confirmed via webhook: {webhook_response.session_id}")
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Stripe webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ==================== RAZORPAY INTEGRATION ====================

@router.post("/razorpay/create-order")
async def create_razorpay_order(request: RazorpayOrderRequest):
    """Create Razorpay order"""
    try:
        if not razorpay_client:
            raise HTTPException(
                status_code=503, 
                detail="Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env file"
            )
        
        # Validate package
        if request.package_id not in PRICING_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid package selected")
        
        package = PRICING_PACKAGES[request.package_id]
        
        if request.package_id == "enterprise":
            raise HTTPException(status_code=400, detail="Please contact sales for Enterprise plan")
        
        # Get amount in INR (Razorpay works in paise - multiply by 100)
        amount_inr = package["amount_inr"]
        if not amount_inr:
            raise HTTPException(status_code=400, detail="Package not available in INR")
        
        amount_paise = int(amount_inr * 100)
        
        # Create Razorpay order
        order_data = {
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1,
            "notes": {
                "package_id": request.package_id,
                "package_name": package["name"],
                "user_email": request.user_email or "guest"
            }
        }
        
        razorpay_order = razorpay_client.order.create(data=order_data)
        
        # Create transaction record
        transaction = PaymentTransaction(
            order_id=razorpay_order["id"],
            package_id=request.package_id,
            package_name=package["name"],
            amount=amount_inr,
            currency="INR",
            payment_gateway="razorpay",
            payment_status="pending",
            user_email=request.user_email,
            metadata={
                "package_id": request.package_id,
                "package_name": package["name"]
            }
        )
        
        await db.payment_transactions.insert_one(transaction.dict())
        
        logger.info(f"Razorpay order created: {razorpay_order['id']}")
        
        return {
            "order_id": razorpay_order["id"],
            "amount": amount_paise,
            "currency": "INR",
            "key_id": RAZORPAY_KEY_ID,
            "package_name": package["name"],
            "payment_gateway": "razorpay"
        }
        
    except Exception as e:
        logger.error(f"Razorpay order error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/razorpay/verify")
async def verify_razorpay_payment(request: RazorpayVerifyRequest):
    """Verify Razorpay payment signature"""
    try:
        if not razorpay_client:
            raise HTTPException(status_code=503, detail="Razorpay is not configured")
        
        # Verify signature
        params_dict = {
            'razorpay_order_id': request.razorpay_order_id,
            'razorpay_payment_id': request.razorpay_payment_id,
            'razorpay_signature': request.razorpay_signature
        }
        
        try:
            razorpay_client.utility.verify_payment_signature(params_dict)
        except:
            raise HTTPException(status_code=400, detail="Invalid payment signature")
        
        # Check if already processed
        existing = await db.payment_transactions.find_one(
            {"order_id": request.razorpay_order_id, "payment_status": "paid"}
        )
        
        if existing:
            return {"status": "success", "message": "Payment already processed"}
        
        # Update transaction
        result = await db.payment_transactions.update_one(
            {"order_id": request.razorpay_order_id},
            {
                "$set": {
                    "payment_id": request.razorpay_payment_id,
                    "payment_status": "paid"
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        logger.info(f"Razorpay payment verified: {request.razorpay_payment_id}")
        
        return {"status": "success", "message": "Payment verified successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Razorpay verify error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/razorpay/webhook")
async def razorpay_webhook(request: Request):
    """Handle Razorpay webhooks"""
    try:
        if not razorpay_client:
            raise HTTPException(status_code=503, detail="Razorpay is not configured")
        
        payload = await request.body()
        signature = request.headers.get('X-Razorpay-Signature', '')
        webhook_secret = os.environ.get('RAZORPAY_WEBHOOK_SECRET', '')
        
        if not webhook_secret:
            logger.warning("Razorpay webhook secret not configured")
            return {"status": "ignored"}
        
        # Verify webhook signature
        razorpay_client.utility.verify_webhook_signature(
            payload.decode(),
            signature,
            webhook_secret
        )
        
        # Process webhook event
        import json
        event_data = json.loads(payload)
        
        event = event_data.get('event')
        payment_entity = event_data.get('payload', {}).get('payment', {}).get('entity', {})
        
        if event == 'payment.captured':
            order_id = payment_entity.get('order_id')
            payment_id = payment_entity.get('id')
            
            # Update transaction (only if not already paid)
            await db.payment_transactions.update_one(
                {"order_id": order_id, "payment_status": {"$ne": "paid"}},
                {
                    "$set": {
                        "payment_id": payment_id,
                        "payment_status": "paid"
                    }
                }
            )
            
            logger.info(f"Razorpay payment captured via webhook: {payment_id}")
        
        return {"status": "processed"}
        
    except Exception as e:
        logger.error(f"Razorpay webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ==================== COMMON ENDPOINTS ====================

@router.get("/packages")
async def get_pricing_packages():
    """Get all pricing packages"""
    return {
        "packages": PRICING_PACKAGES,
        "available_gateways": {
            "stripe": True,
            "razorpay": razorpay_client is not None
        }
    }

@router.get("/transaction/{transaction_id}")
async def get_transaction(transaction_id: str):
    """Get transaction details"""
    transaction = await db.payment_transactions.find_one({"id": transaction_id})
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction
