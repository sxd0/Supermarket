from app.category.models import Category
from app.dao.base import BaseDAO



class CategoryDAO(BaseDAO):
    model = Category