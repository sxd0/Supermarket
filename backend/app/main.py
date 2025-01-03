import time
from fastapi import FastAPI, Request
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
from app.logger import logger
from starlette.middleware.sessions import SessionMiddleware
from app.config import settings


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


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers",
                   "Access-Control-Allow-Origin", "Authorization"],
)




@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    logger.info("Request execution time", extra={
        "process_time": round(process_time, 4)
    })
    return response


admin = Admin(app, engine, authentication_backend=authentication_backend)

admin.add_view(UserAdmin)
admin.add_view(CardAdmin)
admin.add_view(ReviewAdmin)
admin.add_view(CategoryAdmin)
admin.add_view(CartAdmin)
admin.add_view(RoleAdmin)
admin.add_view(PaymentAdmin)
admin.add_view(OrderAdmin)