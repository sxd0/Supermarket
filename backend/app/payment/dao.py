from app.card.models import Card
from app.dao.base import BaseDAO
from app.payment.models import Order, Payment



class PaymentDAO(BaseDAO):
    model = Payment

class OrderDAO(BaseDAO):
    model = Order