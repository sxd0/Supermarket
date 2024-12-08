# from decimal import Decimal
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, DECIMAL
from app.database import Base
from datetime import datetime
from sqlalchemy.orm import relationship



class Payment(Base):
    __tablename__ = "payment"
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("order.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    status = Column(String)  # Например: "success", "failed"
    amount = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="payment")
    order = relationship("Order", back_populates="payment")


    def __str__(self):
        return f"{self.status}"


class Order(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    status = Column(String, nullable=False)  # Например: "pending", "completed", "cancelled"
    total_amount = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="order")
    payment = relationship("Payment", back_populates="order")

    def __str__(self):
        return f"{self.status}"