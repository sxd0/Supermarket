from fastapi import APIRouter


router = APIRouter(
    prefix="/review",
    tags=["Отзывы"],
)

"""
POST /reviews
Создание нового отзыва. Для пользователя
Описание: Пользователь добавляет отзыв на товар.

DELETE /reviews/{id}. Для пользователя
Удаление отзыва.
Описание: Удаляет отзыв по идентификатору.
"""