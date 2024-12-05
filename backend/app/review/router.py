from fastapi import APIRouter, Depends

from app.review.dao import ReviewDAO
from app.user.dependencies import get_current_user
from app.user.models import User


router = APIRouter(
    prefix="/review",
    tags=["Отзывы"],
)

@router.get("/all") # Инструмент разработчика
async def get_reviews():
    return await ReviewDAO.find_all()

@router.get("") # Получение всех отзывов для пользователя
async def get_reviews_for_user(user: User = Depends(get_current_user)):
    return await ReviewDAO.find_all(user_id=user.id)


@router.post("")
async def add_reviews_for_card(
    stars: int,
    description: str,
    card_id: int,
    user: User = Depends(get_current_user),
):
    reviews = await ReviewDAO.add(user_id=user.id, stars=stars, description=description, card_id=card_id)


@router.delete("")
async def remove_reviews(
    reviews_id: int,
    current_user: User = Depends(get_current_user),
):
    await ReviewDAO.delete(id=reviews_id, user_id=current_user.id)
    


@router.get("/{card_id}") # Получение всех отзывов на товар
async def get_reviews_card(card_id: int):
    return await ReviewDAO.find_all(card_id = card_id)

"""
POST /reviews
Создание нового отзыва. Для пользователя
Описание: Пользователь добавляет отзыв на товар.

DELETE /reviews/{id}. Для пользователя
Удаление отзыва.
Описание: Удаляет отзыв по идентификатору.
"""