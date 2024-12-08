from fastapi import APIRouter, HTTPException, Depends
from app.card.dao import CardDAO
from app.cart.dao import CartDAO
from app.payment.models import Order, Payment
from app.payment.schemas import SPayment
from app.payment.dao import OrderDAO, PaymentDAO
from app.user.dependencies import get_current_user
from app.user.models import User

router = APIRouter(
    prefix="/pay",
    tags=["Оплата"]
)

@router.get("/order") # Получение всех отзывов для пользователя
async def get_orders_for_user(user: User = Depends(get_current_user)):
    return await OrderDAO.find_all(user_id=user.id)

@router.get("") # Получение всех отзывов для пользователя
async def get_payment_for_user(user: User = Depends(get_current_user)):
    return await PaymentDAO.find_all(user_id=user.id)

@router.post("/check-cart/")
async def check_cart_and_create_order(
    user_id: int,
):
    # Получаем корзину пользователя
    cart_items = await CartDAO.find_all(user_id=user_id)
    if not cart_items:
        raise HTTPException(status_code=400, detail="Корзина пуста.")

    total_amount = 0

    # Проверяем доступность товаров в корзине
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

    # # Создаём заказ
    # order = Order(
    #     user_id=user_id,
    #     status="pending",
    #     total_amount=total_amount
    # )
    await OrderDAO.add(user_id=user_id, status="pending", total_amount=total_amount)

    return {"message": "Заказ создан.", "total_amount": total_amount}



@router.post("/payments/")
async def process_payment(
    order_id: int,
    current_user: User = Depends(get_current_user),

):
    # Проверяем существование заказа
    order = await OrderDAO.find_one_or_none(id=order_id, user_id=current_user.id)
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден.")

    if order.status != "pending":
        raise HTTPException(status_code=400, detail="Заказ уже обработан.")

    # # Создаём запись о платеже
    # payment_record = Payment(
    #     order_id=payment.order_id,
    #     user_id=payment.user_id,
    #     status="success",
    #     amount=payment.amount
    # )
    await PaymentDAO.add(order_id=order_id, user_id=current_user.id, status="success", amount=order.total_amount)

    # Обновляем статус заказа

    await OrderDAO.update(filter_by={'id': order_id, 'user_id': current_user.id}, status="completed")

    return {"message": "Платеж обработан успешно."}
