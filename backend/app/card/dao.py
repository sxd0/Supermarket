from app.card.models import Card
from app.dao.base import BaseDAO



class CardDAO(BaseDAO):
    model = Card