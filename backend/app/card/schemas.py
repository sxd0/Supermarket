from typing import List
from pydantic import BaseModel, ConfigDict


class SCard(BaseModel):
    id: int
    title: str
    price: int
    size: List[str]
    gender: str
    category_id: int
    quantity: int
    description: str
    sale: int | None = None
    new: bool | None = None
    popular: bool | None = None
    image: str

    model_config = ConfigDict(from_attributes=True)