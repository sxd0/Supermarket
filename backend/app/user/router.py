import json
from typing import List
from fastapi import APIRouter, Depends, Request, Response, requests, status, HTTPException
from jose import JWTError, jwt

from app.config import settings
from app.user.auth import authenticate_user, create_access_token, create_refresh_token, get_password_hash, verify_password
from app.user.dao import UserDAO
from app.user.dependencies import get_current_user, get_refresh_token, get_token
from app.user.models import User
from app.user.schemas import SUserLogin, SUserRegister
from authlib.integrations.starlette_client import OAuth
from httpx import AsyncClient

router = APIRouter(
    prefix="/auth",
    tags=["Auth & Пользователи"],
)

# # Инициализация OAuth
# oauth = OAuth()
# oauth.register(
#     name="vk",
#     client_id=settings.VK_CLIENT_ID,
#     client_secret=settings.VK_CLIENT_SECRET,
#     authorize_url="https://oauth.vk.com/authorize",
#     access_token_url="https://oauth.vk.com/access_token",
#     client_kwargs={"scope": "email"}
# )

# VK_API_BASE = "https://api.vk.com/method"


# @router.get("/auth/vk/login")
# async def vk_login(request: Request):
#     redirect_uri = "http://localhost:8000/auth/vk/callback"
#     return await oauth.vk.authorize_redirect(request, redirect_uri)


# @router.get("/callback")
# async def vk_callback(code: str):
#     """
#     Обработчик коллбэка после авторизации через ВКонтакте.
#     """
#     # Получение access_token от ВКонтакте
#     token_url = (
#         f"https://oauth.vk.com/access_token"
#         f"?client_id={settings.VK_APP_ID}&client_secret={settings.VK_APP_SECRET}"
#         f"&redirect_uri={settings.VK_REDIRECT_URI}&code={code}"
#     )
#     token_response = requests.get(token_url).json()

#     if "access_token" not in token_response:
#         raise HTTPException(status_code=400, detail="Ошибка при получении токена.")

#     access_token = token_response["access_token"]
#     vk_user_id = token_response["user_id"]

#     # Получение данных пользователя через API ВКонтакте
#     user_info_url = (
#         f"https://api.vk.com/method/users.get"
#         f"?user_ids={vk_user_id}&fields=first_name,last_name"
#         f"&access_token={access_token}&v=5.131"
#     )
#     user_info_response = requests.get(user_info_url).json()

#     if "response" not in user_info_response:
#         raise HTTPException(status_code=400, detail="Ошибка при получении данных пользователя.")

#     user_info = user_info_response["response"][0]
#     vk_user_data = {
#         "vk_id": vk_user_id,
#         "first_name": user_info.get("first_name"),
#         "last_name": user_info.get("last_name"),
#     }

#     # Проверяем, существует ли пользователь в базе
#     existing_user = await UserDAO.find_one_or_none(vk_id=vk_user_data["vk_id"])
#     if not existing_user:
#         # Создаем нового пользователя
#         await UserDAO.add(**vk_user_data)

#     return {"message": "Успешная авторизация через ВКонтакте.", "user": vk_user_data}


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

# @router.get("/me")
# async def read_users_me(current_user: User = Depends(get_current_user)):
#     return current_user


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

# @router.get("/all")
# async def read_users_all():
#     return await UserDAO.find_all()
