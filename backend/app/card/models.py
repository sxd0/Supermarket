from sqlalchemy import ARRAY, CheckConstraint, Column, Enum, ForeignKey, Integer, String, Boolean
from app.database import Base
from sqlalchemy.orm import relationship
import enum


# class GenderEnum(enum.Enum):
#     MAN = "man"
#     FEMALE = "female"


class Card(Base):
    __tablename__ = "card"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    size = Column(ARRAY(String), default=[] ,nullable=False)
    gender = Column(String, nullable=False)
    category_id = Column(ForeignKey("category.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    sale = Column(Integer)
    new = Column(Boolean)
    popular = Column(Boolean)
    image = Column(String, nullable=False)

    category = relationship("Category", back_populates="card")
    review = relationship("Review", back_populates="card")

    cart = relationship("Cart", back_populates="card")



    def __str__(self):
        return f"{self.title}"
