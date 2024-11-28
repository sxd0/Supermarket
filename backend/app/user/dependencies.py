from datetime import datetime
from jose import jwt, JWTError

from fastapi import Depends, HTTPException, Request, status
from app.config import settings
from app.user.dao import UserDAO
from app.user.models import User

def get_token(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    return token

async def get_current_user(token: str = Depends(get_token)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, settings.ALGORITHM
        )
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST) #

    expire: str = payload.get("exp")
    if (not expire) or (int(expire) < datetime.utcnow().timestamp()):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    user_id: str = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    user = await UserDAO.find_one_or_none(id=int(user_id))
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    return user

# async def get_current_admin_user(current_user: Users = Depends(get_current_user)):
#     # if current_user.role != "admin":
#     #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
#     return current_user