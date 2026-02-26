from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class ManualPaymentRequest(BaseModel):
    package_id: str
    package_name: str
    amount: float
    currency: str = "INR"
    payment_method: str  # "bank_transfer" or "upi"
    transaction_id: Optional[str] = None
    payment_screenshot_url: Optional[str] = None
    user_name: str
    user_email: str
    user_phone: Optional[str] = None
    notes: Optional[str] = None

class ManualPaymentRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str = Field(default_factory=lambda: f"ORD{uuid.uuid4().hex[:8].upper()}")
    package_id: str
    package_name: str
    amount: float
    currency: str
    payment_method: str
    transaction_id: Optional[str] = None
    payment_screenshot_url: Optional[str] = None
    user_name: str
    user_email: str
    user_phone: Optional[str] = None
    notes: Optional[str] = None
    status: str = "pending"  # pending, verified, rejected
    created_at: datetime = Field(default_factory=datetime.utcnow)
    verified_at: Optional[datetime] = None
    verified_by: Optional[str] = None

class BankDetails(BaseModel):
    account_name: str
    account_number: str
    ifsc_code: str
    bank_name: str
    branch: str
    account_type: str

class UPIDetails(BaseModel):
    upi_id: str
    upi_name: str
    qr_code_url: Optional[str] = None
