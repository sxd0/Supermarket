from sqlalchemy import select
from app.card.models import Card
from app.dao.base import BaseDAO
from app.database import async_session_maker


class CardDAO(BaseDAO):
    model = Card

    @classmethod
    async def find_all(cls, skip: int = 0, limit: int = 10, new: bool = None, popular: bool = None, sale: int = None):
        async with async_session_maker() as session:
            query = select(cls.model.__table__.columns)
            if new is not None:
                query = query.where(cls.model.new == True)
            if popular is not None:
                query = query.where(cls.model.popular == True)
            if sale is not None:
                query = query.where(cls.model.sale.is_not(None))

            query = query.offset(skip).limit(limit)
            result = await session.execute(query)
            return result.mappings().all()