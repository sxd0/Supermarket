from sqlalchemy import Column, ForeignKey, Integer, String
from app.database import Base


class Review(Base):
    __tablename__ = "review"

    id = Column(Integer, primary_key=True, nullable=False)
    stars = Column(Integer)
    description = Column(String, nullable=False)
    user_id = Column(ForeignKey("user.id"), nullable=False)
    card_id = Column(ForeignKey("card.id"), nullable=False)