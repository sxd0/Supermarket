from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    image = Column(String, nullable=False)


    card = relationship("Card", back_populates="category")


    def __str__(self):
        return f"{self.title}"