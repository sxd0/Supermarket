from sqlalchemy import Column, Integer, String
from app.database import Base


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    image = Column(Integer)
