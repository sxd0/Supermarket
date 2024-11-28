from fastapi import APIRouter

from app.card.dao import CardDAO


router = APIRouter(
    prefix="/card",
    tags=["Карточки товаров"],
)


@router.get("")
async def get_card():
    return await CardDAO.find_all()


@router.get("/{id}")
async def get_card_by_id(card_id: int):
    return await CardDAO.find_one_or_none(id = card_id)

"""
GET /cards
Получение списка всех товаров.
Описание: Возвращает карточки товаров с фильтрацией по категориям и новизне.

GET /cards/{id}
Получение информации о товаре.
Описание: Возвращает подробности о товаре.

GET /cards/{id}/reviews
Получение отзывов на товар.
Описание: Возвращает список отзывов на данный товар.
"""