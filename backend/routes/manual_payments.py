from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime
from models.manual_payment import (
    ManualPaymentRequest,
    ManualPaymentRecord,
    BankDetails,
    UPIDetails
)
from models.payment import PRICING_PACKAGES

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/manual-payments", tags=["manual-payments"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'sdwrite')
mongo_client = AsyncIOMotorClient(mongo_url)
db = mongo_client[db_name]

# Bank and UPI details (Real account details)
BANK_DETAILS = BankDetails(
    account_name="RUBI SHARMA",
    account_number="3245610539",
    ifsc_code="KKBK0004333",
    bank_name="Kotak Mahindra Bank",
    branch="HISAR (Branch Code: 4333)",
    account_type="Savings Account"
)

UPI_DETAILS = UPIDetails(
    upi_id="9467016116@paytm",  # Update this with your actual UPI ID
    upi_name="RUBI SHARMA",
    qr_code_url=None  # You can add QR code image URL later
)

@router.get("/bank-details")
async def get_bank_details():
    """Get bank account details for manual transfer"""
    return {
        "bank_details": BANK_DETAILS.dict(),
        "instructions": [
            "Transfer the exact amount to the above bank account",
            "Use your Order ID as reference/remark",
            "Take a screenshot of the successful transaction",
            "Upload the screenshot in the next step",
            "Your subscription will be activated within 2-24 hours after verification"
        ]
    }

@router.get("/upi-details")
async def get_upi_details():
    """Get UPI details for payment"""
    return {
        "upi_details": UPI_DETAILS.dict(),
        "instructions": [
            "Open any UPI app (PhonePe, GPay, Paytm, etc.)",
            "Pay to the above UPI ID or scan QR code",
            "Enter the exact amount",
            "Use your Order ID in notes/remark",
            "Take a screenshot of the successful payment",
            "Upload the screenshot in the next step",
            "Your subscription will be activated within 2-24 hours after verification"
        ]
    }

@router.post("/submit-payment")
async def submit_manual_payment(payment: ManualPaymentRequest):
    """Submit manual payment details for verification"""
    try:
        # Validate package
        if payment.package_id not in PRICING_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid package selected")
        
        package = PRICING_PACKAGES[payment.package_id]
        
        # Validate amount
        expected_amount = package.get("amount_inr")
        if expected_amount and abs(payment.amount - expected_amount) > 1:
            raise HTTPException(
                status_code=400, 
                detail=f"Amount mismatch. Expected: ₹{expected_amount}, Received: ₹{payment.amount}"
            )
        
        # Create payment record
        payment_record = ManualPaymentRecord(
            package_id=payment.package_id,
            package_name=payment.package_name,
            amount=payment.amount,
            currency=payment.currency,
            payment_method=payment.payment_method,
            transaction_id=payment.transaction_id,
            payment_screenshot_url=payment.payment_screenshot_url,
            user_name=payment.user_name,
            user_email=payment.user_email,
            user_phone=payment.user_phone,
            notes=payment.notes,
            status="pending"
        )
        
        # Save to database
        result = await db.manual_payments.insert_one(payment_record.dict())
        
        logger.info(f"Manual payment submitted: {payment_record.order_id} by {payment.user_email}")
        
        # TODO: Send email notification to admin for verification
        
        return {
            "success": True,
            "order_id": payment_record.order_id,
            "message": "Payment details submitted successfully! We'll verify and activate your subscription within 2-24 hours.",
            "status": "pending_verification",
            "verification_email": "You'll receive a confirmation email once verified."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Manual payment submission error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/payment-status/{order_id}")
async def get_payment_status(order_id: str):
    """Check manual payment verification status"""
    payment = await db.manual_payments.find_one({"order_id": order_id})
    
    if not payment:
        raise HTTPException(status_code=404, detail="Payment record not found")
    
    return {
        "order_id": order_id,
        "status": payment["status"],
        "package_name": payment["package_name"],
        "amount": payment["amount"],
        "currency": payment["currency"],
        "submitted_at": payment["created_at"],
        "verified_at": payment.get("verified_at"),
        "message": {
            "pending": "Your payment is under verification. You'll receive an email once verified.",
            "verified": "Payment verified! Your subscription is now active.",
            "rejected": "Payment verification failed. Please contact support."
        }.get(payment["status"], "Unknown status")
    }

@router.get("/pending-payments")
async def get_pending_payments(skip: int = 0, limit: int = 50):
    """Get all pending payments for admin verification"""
    # TODO: Add authentication/authorization for admin only
    
    payments = await db.manual_payments.find(
        {"status": "pending"}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    return {
        "count": len(payments),
        "payments": payments
    }

@router.post("/verify-payment/{order_id}")
async def verify_payment(order_id: str, verified_by: str = "admin"):
    """Admin endpoint to verify payment"""
    # TODO: Add authentication/authorization
    
    result = await db.manual_payments.update_one(
        {"order_id": order_id, "status": "pending"},
        {
            "$set": {
                "status": "verified",
                "verified_at": datetime.utcnow(),
                "verified_by": verified_by
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found or already verified")
    
    # TODO: Send confirmation email to user
    # TODO: Activate user subscription
    
    return {"success": True, "message": "Payment verified successfully"}

@router.post("/reject-payment/{order_id}")
async def reject_payment(order_id: str, reason: str = None):
    """Admin endpoint to reject payment"""
    # TODO: Add authentication/authorization
    
    update_data = {
        "status": "rejected",
        "verified_at": datetime.utcnow()
    }
    if reason:
        update_data["rejection_reason"] = reason
    
    result = await db.manual_payments.update_one(
        {"order_id": order_id, "status": "pending"},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    # TODO: Send rejection email to user
    
    return {"success": True, "message": "Payment rejected"}
