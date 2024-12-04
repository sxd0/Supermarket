from app.database import async_session_maker
from sqlalchemy import delete, func, insert, select


# Работа с базой данных изолированная в отдельный файл
class BaseDAO:
    model = None
        
    
    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model.__table__.columns).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().one_or_none()

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model.__table__.columns).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().all()
        
    @classmethod ## Фейкии
    async def add(cls, **data):
        async with async_session_maker() as session:
            # Получаем максимальный id в таблице
            result = await session.execute(select(func.max(cls.model.id)))
            max_id = result.scalar() or 0
            new_id = max_id + 1
            
            # Вставляем запись с явно заданным id
            data['id'] = new_id
            query = insert(cls.model).values(**data)
            await session.execute(query)
            await session.commit()

    # @classmethod
    # async def add(cls, **data):
    #     async with async_session_maker() as session:
    #         query = insert(cls.model).values(**data)
    #         query = query.on_conflict_do_nothing(index_elements=['id'])  # или ['email']
    #         await session.execute(query)
    #         await session.commit()

    @classmethod
    async def delete(cls, **filter_by):
        async with async_session_maker() as session:
            query = delete(cls.model).filter_by(**filter_by)
            await session.execute(query)
            await session.commit()