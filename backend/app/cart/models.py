from sqlalchemy import Column, ForeignKey, Integer
from app.database import Base


class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(ForeignKey("user.id"), nullable=False)
    card_id = Column(ForeignKey("card.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
