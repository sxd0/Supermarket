from fastapi import Depends
from app.user.dependencies import get_current_user
from app.user.models import User
from app.user.role.dao import RoleDAO
from app.user.router import router


# @router.get("/roles") #Получение всех ролей
# async def get_all_roles():
#     return await RoleDAO.find_all()

