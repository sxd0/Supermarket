from fastapi import APIRouter, Depends

from app.review.dao import ReviewDAO
from app.user.dependencies import get_current_user
from app.user.models import User


router = APIRouter(
    prefix="/review",
    tags=["Отзывы"],
)

# @router.get("") # Инструмент разработчика
# async def get_reviews():
#     return await ReviewDAO.find_all()

@router.get("") # Получение всех отзывов для пользователя
async def get_reviews_for_user(user: User = Depends(get_current_user)):
    return await ReviewDAO.find_all(user_id=user.id)



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