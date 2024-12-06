from sqlalchemy import Column, ForeignKey, Integer
from app.database import Base
from sqlalchemy.orm import relationship

class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(ForeignKey("user.id"), nullable=False)
    card_id = Column(ForeignKey("card.id"), nullable=False)
    quantity = Column(Integer, nullable=False)


    user = relationship("User", back_populates="cart")

    card = relationship("Card", back_populates="cart")

    def __str__(self):
        return f"{self.id}"