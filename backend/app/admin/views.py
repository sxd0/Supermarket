from sqladmin import ModelView
from app.card.models import Card
from app.cart.models import Cart
from app.category.models import Category
from app.payment.models import Order, Payment
from app.review.models import Review
from app.user.models import User
from app.user.role.models import Role

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.email] + [User.review, User.cart]
    column_details_exclude_list = [User.hashed_password]
    can_delete = False
    name = "Пользователь"
    name_plural = "Пользователи"
    icon = "fa-solid fa-user"


class CardAdmin(ModelView, model=Card):
    column_list = [c.name for c in Card.__table__.c] + [Card.category]
    form_excluded_columns = [Card.review, Card.cart]
    name = "Товар"
    name_plural = "Карточки товаров"


class CategoryAdmin(ModelView, model=Category):
    column_list = [c.name for c in Category.__table__.c] + [Category.card]
    form_excluded_columns = [Category.card]
    name = "Категория"
    name_plural = "Категории"


class ReviewAdmin(ModelView, model=Review):
    column_list = [c.name for c in Review.__table__.c] + [Review.card, Review.user]
    name = "Отзыв"
    name_plural = "Отзывы"

class CartAdmin(ModelView, model=Cart):
    column_list = [c.name for c in Cart.__table__.c] + [Cart.user, Cart.card]
    name = "Корзина"
    name_plural = "Корзины"

class RoleAdmin(ModelView, model=Role):
    column_list = [c.name for c in Role.__table__.c] + [Cart.user]
    name = "Роль"
    name_plural = "Роли"

class OrderAdmin(ModelView, model=Order):
    column_list = [c.name for c in Order.__table__.c] + [Payment.user]
    name = "Заказ"
    name_plural = "Заказы"

class PaymentAdmin(ModelView, model=Payment):
    column_list = [c.name for c in Payment.__table__.c] + [Order.user]
    name = "Платеж"
    name_plural = "Платежи"