from pydantic import BaseModel, ConfigDict


class SCart(BaseModel):
    id: int
    user_id: str
    card_id: int
    quantity: int


    class Config:
        model_config = ConfigDict(from_attributes=True)