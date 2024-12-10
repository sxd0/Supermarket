from fastapi import APIRouter, Depends, Query

from app.card.dao import CardDAO
from app.card.models import Card
from app.card.schemas import SCard
from app.user.dependencies import get_current_user
from app.user.models import User


router = APIRouter(
    prefix="/card",
    tags=["Карточки товаров"],
)


@router.get("")
async def get_card(
    skip: int = Query(0, description="skip"),
    limit: int = Query(10, description="return")
) -> list[SCard]:
    return await CardDAO.find_all_modified(skip=skip, limit=limit)

@router.get("/new")
async def get_new_card(
    skip: int = Query(0, description="skip"),
    limit: int = Query(10, description="return")
) -> list[SCard]:
    return await CardDAO.find_all_modified(skip=skip, limit=limit, new=True)

@router.get("/popular")
async def get_popular_card(
    skip: int = Query(0, description="skip"),
    limit: int = Query(10, description="return")
) -> list[SCard]:
    return await CardDAO.find_all_modified(skip=skip, limit=limit, popular=True)

@router.get("/sale")
async def get_sale_card(
    skip: int = Query(0, description="skip"),
    limit: int = Query(10, description="return")
) -> list[SCard]:
    return await CardDAO.find_all_modified(skip=skip, limit=limit, sale=True)

@router.get("/{card_id}") # Получени одного товара по id
async def get_card_by_id(card_id: int) -> SCard:
    return await CardDAO.find_one_or_none(id = card_id)


@router.get("/only/{category_id}")
async def get_card_for_category(
    category_id: int,
) -> list[SCard]:
    return await CardDAO.find_all(category_id=category_id)
