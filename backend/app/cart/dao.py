from app.cart.models import Cart
from app.dao.base import BaseDAO



class CartDAO(BaseDAO):
    model = Cart