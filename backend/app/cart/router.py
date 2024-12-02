from fastapi import APIRouter


router = APIRouter(
    prefix="/cart",
    tags=["Корзина"],
)


"""
GET /cart/{user_id}
Получение корзины пользователя.
Описание: Возвращает товары, добавленные в корзину.

POST /cart
Добавление товара в корзину.
Описание: Добавляет товар в корзину пользователя.

DELETE /cart/{user_id}/{card_id}
Удаление товара из корзины.
Описание: Удаляет указанный товар из корзины пользователя.
"""