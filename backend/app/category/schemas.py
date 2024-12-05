from pydantic import BaseModel, ConfigDict


class SCategory(BaseModel):
    id: int
    title: str
    gender: str
    image: str


    class Config:
        model_config = ConfigDict(from_attributes=True)