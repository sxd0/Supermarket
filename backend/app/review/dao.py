from app.dao.base import BaseDAO
from app.review.models import Review



class ReviewDAO(BaseDAO):
    model = Review