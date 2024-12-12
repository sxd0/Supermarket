from fastapi import APIRouter, Depends, HTTPException

from app.review.dao import ReviewDAO
from app.review.schemas import SReview, SReviewAdd
from app.user.dependencies import get_current_user
from app.user.models import User


router = APIRouter(
    prefix="/review",
    tags=["Отзывы"],
)

# @router.get("/all") # Инструмент разработчика
# async def get_reviews():
#     return await ReviewDAO.find_all()

@router.get("") # Получение всех отзывов для пользователя
async def get_reviews_for_user(user: User = Depends(get_current_user)) -> list[SReview]:
    return await ReviewDAO.find_all(user_id=user.id)


@router.post("")
async def add_reviews_for_card(
    rev_data: SReviewAdd,
    user: User = Depends(get_current_user),
): # Если в таблице reviews есть обзор у которого id пользователя который хочет добавить отзыв то не дать ему разрешение
    antimulti = await ReviewDAO.find_one_or_none(user_id=user.id, card_id=rev_data.card_id)
    if antimulti:
        raise HTTPException(status_code=400)
    reviews = await ReviewDAO.add(user_id=user.id, stars=rev_data.stars, description=rev_data.description, card_id=rev_data.card_id)


@router.delete("")
async def remove_reviews(
    reviews_id: int,
    current_user: User = Depends(get_current_user),
):
    await ReviewDAO.delete(id=reviews_id, user_id=current_user.id)
    


@router.get("/{card_id}") # Получение всех отзывов на товар
async def get_reviews_card(card_id: int) -> list[SReview]:
    return await ReviewDAO.find_all(card_id = card_id)
