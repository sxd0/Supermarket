from datetime import datetime
from jose import jwt, JWTError

from fastapi import Depends, Request, status
from app.config import settings
from app.user.dao import UsersDAO
from app.user.models import Users

def get_token(request: Request):
    token = request.cookies.get("booking_access_token")
    if not token:
        raise status.HTTP_400_BAD_REQUEST
    return token

async def get_current_user(token: str = Depends(get_token)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, settings.ALGORITHM
        )
    except JWTError:
        raise status.HTTP_400_BAD_REQUEST

    expire: str = payload.get("exp")
    if (not expire) or (int(expire) < datetime.utcnow().timestamp()):
        raise status.HTTP_400_BAD_REQUEST
    user_id: str = payload.get("sub")
    if not user_id:
        raise status.HTTP_400_BAD_REQUEST
    user = await UsersDAO.find_by_id(int(user_id))
    if not user:
        raise status.HTTP_400_BAD_REQUEST

    return user

# async def get_current_admin_user(current_user: Users = Depends(get_current_user)):
#     # if current_user.role != "admin":
#     #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
#     return current_user