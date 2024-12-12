from typing import List
from fastapi import APIRouter, Depends

from app.card.dao import CardDAO
from app.cart.dao import CartDAO
from app.cart.schemas import SCart, SCartCreate
from app.user.dependencies import get_current_user
from app.user.models import User


router = APIRouter(
    prefix="/cart",
    tags=["Корзина"],
)


# @router.get("/all")
# async def read_cart_all():
#     return await CartDAO.find_all()

@router.get("") # Получение корзины для пользователя
async def get_cart_for_user(user: User = Depends(get_current_user)) -> list[SCart]:
    return await CartDAO.find_all(user_id=user.id)


@router.post("")
async def add_card_in_cart(
    cart_data: SCartCreate,
    user: User = Depends(get_current_user),
):
    existing_cart_item = await CartDAO.find_one_or_none(user_id=user.id, card_id=cart_data.card_id)
    if existing_cart_item:
        new_quantity = existing_cart_item.quantity + cart_data.quantity
        await CartDAO.update(filter_by={'id': existing_cart_item.id, 'user_id': user.id}, quantity=new_quantity)

    else:
        # Если товара нет, добавляем новый
        await CartDAO.add(user_id=user.id, card_id=cart_data.card_id, quantity=cart_data.quantity)


@router.delete("")
async def remove_card_from_cart(
    cart_id: int,
    current_user: User = Depends(get_current_user),
):
    await CartDAO.delete(id=cart_id, user_id=current_user.id)


@router.put("/update_quantity")  # Изменение количества товаров в корзине
async def update_card_quantity_in_cart(
    cart_id: int,
    new_quantity: int,
    current_user: User = Depends(get_current_user),
):
    await CartDAO.update(filter_by={'id': cart_id, 'user_id': current_user.id}, quantity=new_quantity)
    
