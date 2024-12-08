from datetime import datetime
from pydantic import BaseModel, ConfigDict, condecimal

class SPayment(BaseModel):
    order_id: int
    user_id: int
    amount: int = condecimal(max_digits=10, decimal_places=2)
    status: str | None = None
    created_at: datetime | None = None

    class Config:
        model_config = ConfigDict(from_attributes=True)

class SOrder(BaseModel):
    id: int
    user_id: int
    status: str
    total_amount: int = condecimal(max_digits=10, decimal_places=2)
    created_at: datetime

    class Config:
        model_config = ConfigDict(from_attributes=True)
