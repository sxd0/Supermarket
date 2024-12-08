from sqlalchemy import ARRAY, Boolean, Column, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship


class Role(Base):
    __tablename__ = "role"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

    user = relationship("User", back_populates="role")

    def __str__(self):
        return f"Роль: {self.name}"
