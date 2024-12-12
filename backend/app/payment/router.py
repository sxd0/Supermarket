from fastapi import APIRouter, HTTPException, Depends
from app.card.dao import CardDAO
from app.cart.dao import CartDAO
from app.payment.models import Order, Payment
from app.payment.schemas import SOrder, SPayment
from app.payment.dao import OrderDAO, PaymentDAO
from app.user.dependencies import get_current_user
from app.user.models import User

router = APIRouter(
    prefix="/pay",
    tags=["Оплата"]
)


@router.get("/order")  # Получение всех отзывов для пользователя
async def get_orders_for_user(user: User = Depends(get_current_user)) -> list[SOrder]:
    return await OrderDAO.find_all(user_id=user.id)


@router.get("")  # Получение всех отзывов для пользователя
async def get_payment_for_user(user: User = Depends(get_current_user)) -> list[SPayment]:
    return await PaymentDAO.find_all(user_id=user.id)


@router.post("/check-cart/")
async def check_cart_and_create_order(
    user_id: int,
) -> int:
    cart_items = await CartDAO.find_all(user_id=user_id)
    if not cart_items:
        raise HTTPException(status_code=400, detail="Корзина пуста.")

    total_amount = 0

    for item in cart_items:
        card = await CardDAO.find_one_or_none(id=item.card_id)
        if not card:
            raise HTTPException(
                status_code=404, detail=f"Товар с id {item.card_id} не найден."
            )
        if item.quantity > card.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Недостаточно товара: {card.title}. Доступно: {card.quantity}."
            )
        total_amount += item.quantity * card.price

    await OrderDAO.add(user_id=user_id, status="pending", total_amount=total_amount)

    return total_amount


@router.post("/payments/") # добавить удаление оплаченной корзины после оплаты
async def process_payment(
    order_id: int,
    current_user: User = Depends(get_current_user),
):
    order = await OrderDAO.find_one_or_none(id=order_id, user_id=current_user.id)
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден.")

    if order.status != "pending":
        raise HTTPException(status_code=400, detail="Заказ уже обработан.")
    # Добавление инфо об оплаченном товаре в список оплат
    await PaymentDAO.add(order_id=order_id, user_id=current_user.id, status="success", amount=order.total_amount)
    # Обноваление заявки на оплату для смены статуса
    await OrderDAO.update(filter_by={'id': order_id, 'user_id': current_user.id}, status="completed")
    # Обновление карточки для вычетания количества купленных товаров после оплаты
    cart_items = await CartDAO.find_all(user_id=current_user.id) # Поиск всех корзин для определнного пользователя
    for item in cart_items: # item -> одна из корзин для пользователя
        card_data = await CardDAO.find_one_or_none(id=item.card_id)
        res_quantity = card_data.quantity - item.quantity
        await CardDAO.update(filter_by={'id': card_data.card_id}, quantity=res_quantity)
    # Удаление купленной корзины после оплаты
    for item in cart_items:
        await CartDAO.delete(id=item.cart_id, user_id=current_user.id)

    return {"message": "Платеж обработан успешно."}
