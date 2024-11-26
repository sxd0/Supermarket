from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from app.database import Base



class Card(Base):
    __tablename__ = "card"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    category_id = Column(ForeignKey("category.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    sale = Column(Integer)
    new = Column(Boolean)
    flag = Column(Boolean)
    image = Column(Integer)
