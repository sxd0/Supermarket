from pydantic import BaseModel, ConfigDict


class SCard(BaseModel):
    id: int
    title: str
    price: int
    category_id: int
    quantity: int
    description: str
    sale: int | None = None
    new: bool | None = None
    flag: bool | None = None
    image: int | None = None

    class Config:
        model_config = ConfigDict(from_attributes=True)