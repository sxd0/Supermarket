from pydantic import BaseModel, ConfigDict


class SReview(BaseModel):
    id: int
    stars: int | None = None
    description: str
    user_id: int
    card_id: int


    class Config:
        model_config = ConfigDict(from_attributes=True)


class SReviewAdd(BaseModel):
    stars: int | None
    description: str
    card_id: int