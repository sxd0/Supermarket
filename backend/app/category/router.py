from fastapi import APIRouter
from app.category.dao import CategoryDAO
from app.category.schemas import SCategory

router = APIRouter(
    prefix="/category",
    tags=["Категории"],
)


@router.get("")
async def get_categories() -> list[SCategory]:
    return await CategoryDAO.find_all()


"""
GET /categories
Получение списка категорий.
Описание: Возвращает список всех категорий (мужская, женская).

POST /categories{id}
Создание новой категории
"""