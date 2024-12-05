from fastapi import APIRouter, Depends

from app.card.dao import CardDAO
from app.card.models import Card
from app.user.dependencies import get_current_user
from app.user.models import User


router = APIRouter(
    prefix="/card",
    tags=["Карточки товаров"],
)


@router.get("")
async def get_card(): # Получение всех товаров
    return await CardDAO.find_all()

@router.get("/new") # Получение всех новых товаров
async def get_new_card():
    return await CardDAO.find_all(new = True)

@router.get("/{card_id}") # Получени одного товара по id
async def get_card_by_id(card_id: int):
    return await CardDAO.find_one_or_none(id = card_id)


@router.get("/only/{category_id}") # Получение всех товаров по категориям
async def get_card_for_category(category_id: int):
    return await CardDAO.find_all(category_id = category_id)

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