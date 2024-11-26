from fastapi import APIRouter, Response, status

from app.user.auth import authenticate_user, create_access_token, get_password_hash, verify_password
from app.user.dao import UsersDAO
from app.user.dependencies import get_current_user
from app.user.models import Users
from app.user.schemas import SUserAuth

router = APIRouter(
    prefix="/auth",
    tags=["Auth & Пользователи"],
)

@router.post("/register")
async def register_user(user_data: SUserAuth):
    existing_user = await UsersDAO.find_one_or_none(email=user_data.email)
    if existing_user:
        raise status.HTTP_400_BAD_REQUEST
    hashed_password = get_password_hash(user_data.password)
    await UsersDAO.add(email=user_data.email, hashed_password=hashed_password)


@router.post("/login")
async def login_user(response: Response, user_data: SUserAuth):
    user = await authenticate_user(user_data.email, user_data.password)
    if not user:
        raise status.HTTP_400_BAD_REQUEST
    access_token = create_access_token({"sub": str(user.id)})
    response.set_cookie("access_token", access_token, httponly=True)
    return access_token


@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie("access_token")

# @router.get("/me")
# async def read_users_me(current_user: Users = Depends(get_current_user)):
#     return current_user

# @router.get("/all")
# async def read_users_all(current_user: Users = Depends(get_current_admin_user)):
#     return await UsersDAO.find_all()