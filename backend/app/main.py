from fastapi import FastAPI
from sqladmin import Admin
from app.admin.views import CardAdmin, CartAdmin, CategoryAdmin, OrderAdmin, PaymentAdmin, ReviewAdmin, RoleAdmin, UserAdmin
from app.user.router import router as router_user
from app.card.router import router as router_card
from app.cart.router import router as router_cart
from app.category.router import router as router_category
from app.review.router import router as router_review
from app.payment.router import router as router_payment
from app.user.role.router import router as router_role
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.admin.auth import authentication_backend

# Экземпляр приложения
app = FastAPI() 

# Добавляем роутеры
app.include_router(router_user)
app.include_router(router_card)
app.include_router(router_category)
app.include_router(router_cart)
app.include_router(router_review)
app.include_router(router_role)
app.include_router(router_payment)


# CORS
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Authorization"]
)

admin = Admin(app, engine, authentication_backend=authentication_backend)

admin.add_view(UserAdmin)
admin.add_view(CardAdmin)
admin.add_view(ReviewAdmin)
admin.add_view(CategoryAdmin)
admin.add_view(CartAdmin)
admin.add_view(RoleAdmin)
admin.add_view(PaymentAdmin)
admin.add_view(OrderAdmin)