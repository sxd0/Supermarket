from sqlalchemy import ARRAY, Column, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    email = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    favourite = Column(ARRAY(Integer), default=[]) # Возможно буду менять и создавать отдельную таблицу)

    review = relationship("Review", back_populates="user")
    
    cart = relationship("Cart", back_populates="user")

    def __str__(self):
        return f"{self.email}"

# Добавить историю транзакций (отдельная таблица)