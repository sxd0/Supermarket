from fastapi import APIRouter


router = APIRouter(
    prefix="/card",
    tags=["Карточки товаров"],
)