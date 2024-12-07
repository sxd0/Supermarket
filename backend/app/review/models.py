from sqlalchemy import CheckConstraint, Column, ForeignKey, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship

class Review(Base):
    __tablename__ = "review"

    id = Column(Integer, primary_key=True, nullable=False)
    stars = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    user_id = Column(ForeignKey("user.id"), nullable=False)
    card_id = Column(ForeignKey("card.id"), nullable=False)

    card = relationship("Card", back_populates="review")
    user = relationship("User", back_populates="review")

    def __str__(self):
        return f"{self.id}"