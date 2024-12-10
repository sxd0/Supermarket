from pydantic import BaseModel, ConfigDict


class SCart(BaseModel):
    id: int
    user_id: int
    card_id: int
    quantity: int = 1


    class Config:
        model_config = ConfigDict(from_attributes=True)

class SCartCreate(BaseModel):
    card_id: int
    quantity: int = 1

    # class Config:
    #     model_config = ConfigDict(from_attributes=True)


class SCartUpdate(BaseModel):
    quantity: int