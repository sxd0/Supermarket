from app.dao.base import BaseDAO
from app.user.role.models import Role


class RoleDAO(BaseDAO):
    model = Role