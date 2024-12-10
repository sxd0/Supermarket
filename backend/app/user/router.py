from typing import List
from fastapi import APIRouter, Depends, Response, status, HTTPException
from jose import JWTError, jwt

from app.config import settings
from app.user.auth import authenticate_user, create_access_token, create_refresh_token, get_password_hash, verify_password
from app.user.dao import UserDAO
from app.user.dependencies import get_current_user, get_refresh_token, get_token
from app.user.models import User
from app.user.schemas import SUserLogin, SUserRegister

router = APIRouter(
    prefix="/auth",
    tags=["Auth & Пользователи"],
)

@router.post("/register")
async def register_user(user_data: SUserRegister):
    existing_user = await UserDAO.find_one_or_none(email=user_data.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    hashed_password = get_password_hash(user_data.password)
    # adminis: bool = False
    # if user_data.email == "admin@123.com":
    #     adminis = True

    await UserDAO.add(email=user_data.email, hashed_password=hashed_password, name=user_data.name, surname=user_data.surname)




@router.post("/login")
async def login_user(response: Response, user_data: SUserLogin):
    user = await authenticate_user(user_data.email, user_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    access_token = create_access_token({"sub": str(user.id)})
    # response.set_cookie("access_token", access_token, httponly=True)
    refresh_token = create_refresh_token({"sub": str(user.id)})

    response.set_cookie("access_token", access_token, httponly=True)
    response.set_cookie("refresh_token", refresh_token, httponly=True)
    return user

# обновления access токена с использованием refresh токена (((НЕ ХВАТАЕТ УДАЛЕНИЕ КУКИ)))
# @router.post("/refresh")
# async def refresh_token(response: Response, refresh_token: str = Depends(get_token)):
#     try:
#         payload = jwt.decode(refresh_token, settings.SECRET_KEY, settings.ALGORITHM)
#     except JWTError:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

#     user_id: str = payload.get("sub")
#     if not user_id:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
#     user = await UserDAO.find_one_or_none(id=int(user_id))
#     if not user:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

#     access_token = create_access_token({"sub": str(user.id)})
#     response.set_cookie("access_token", access_token, httponly=True)
#     return {"access_token": access_token}

@router.post("/refresh")
async def refresh_token(response: Response, refresh_token: str = Depends(get_refresh_token)):
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, settings.ALGORITHM)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid refresh token")

    user_id: str = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid refresh token")
    user = await UserDAO.find_one_or_none(id=int(user_id))
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")

    # Аннулирование старого access токена
    response.delete_cookie("access_token")

    # Аннулирование старого refresh токена
    response.delete_cookie("refresh_token")

    # Создание нового access токена
    access_token = create_access_token({"sub": str(user.id)})
    response.set_cookie("access_token", access_token, httponly=True)

    # Создание нового refresh токена
    new_refresh_token = create_refresh_token({"sub": str(user.id)})
    response.set_cookie("refresh_token", new_refresh_token, httponly=True)

    return {"access_token": access_token}


@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie("access_token")

@router.get("/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/favoutires")
async def read_favourites_from_user(current_user: User = Depends(get_current_user)):
    return current_user.favourite

@router.post("/favourites/add")
async def add_favourites_for_card(
    favourite: int,
    user: User = Depends(get_current_user),
):
    user_data = await UserDAO.find_one_or_none(id=user.id)
    if user_data is None:
        raise HTTPException(status_code=404, detail="User  not found")

    if favourite in user_data.favourite:
        raise HTTPException(status_code=400, detail="Card already in favourites")

    user_data.favourite.append(favourite)

    await UserDAO.update(filter_by={'id': user.id}, favourite=user_data.favourite)

    return user_data.favourite


@router.delete("/favourites/remove")
async def remove_favourites_for_card(
    favourite: int,
    user: User = Depends(get_current_user),
):
    user_data = await UserDAO.find_one_or_none(id=user.id)
    if user_data is None:
        raise HTTPException(status_code=404, detail="User  not found")

    if favourite not in user_data.favourite:
        raise HTTPException(status_code=400, detail="Card not in favourites")

    user_data.favourite.remove(favourite)

    await UserDAO.update(filter_by={'id': user.id}, favourite=user_data.favourite)

    return user_data.favourite





# @router.get("/all")
# async def read_users_all(current_user: User = Depends(get_current_user)):
#     return await UserDAO.find_all()

@router.get("/all")
async def read_users_all():
    return await UserDAO.find_all()

"""
GET /users/{id}
Получение информации о пользователе.
Описание: Возвращает данные пользователя (имя, email, роль).

GET /users/{id}
Получение информации о себе для пользователя. *
Описание: Возвращает данные пользователя (имя, email).

POST /users
Создание нового пользователя.
Описание: Регистрация нового пользователя.

POST /login
Вход для авторизованного пользователя
Описание: Вход

GET /users/{id}/reviews
Получение всех отзывов пользователя.
Описание: Возвращает список отзывов, оставленных пользователем.
"""