from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
import uuid

# Pricing packages (FIXED - Never accept from frontend)
PRICING_PACKAGES = {
    "starter": {
        "name": "Starter",
        "amount_usd": 29.00,
        "amount_inr": 2400.00,
        "features": ["10,000 words/month", "5 AI tools", "Basic templates", "Email support"]
    },
    "pro": {
        "name": "Pro",
        "amount_usd": 79.00,
        "amount_inr": 6500.00,
        "features": ["100,000 words/month", "20+ AI tools", "Priority support", "Team collaboration"]
    },
    "enterprise": {
        "name": "Enterprise",
        "amount_usd": None,  # Custom pricing
        "amount_inr": None,
        "features": ["Unlimited words", "All features", "Dedicated support", "Custom AI training"]
    }
}

class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: Optional[str] = None
    payment_id: Optional[str] = None
    order_id: Optional[str] = None  # For Razorpay
    package_id: str
    package_name: str
    amount: float
    currency: str
    payment_gateway: str  # "stripe" or "razorpay"
    payment_status: str = "pending"  # pending, paid, failed, expired
    user_email: Optional[str] = None
    metadata: Optional[Dict] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CreateCheckoutRequest(BaseModel):
    package_id: str
    currency: str = "usd"  # usd or inr
    origin_url: str
    user_email: Optional[str] = None

class RazorpayOrderRequest(BaseModel):
    package_id: str
    currency: str = "INR"
    user_email: Optional[str] = None

class RazorpayVerifyRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class CheckoutStatusResponse(BaseModel):
    status: str
    payment_status: str
    amount: float
    currency: str
    package_name: str
    payment_gateway: str
