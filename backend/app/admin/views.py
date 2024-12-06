from sqladmin import ModelView
from app.card.models import Card
from app.cart.models import Cart
from app.category.models import Category
from app.review.models import Review
from app.user.models import User

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
