from fastapi import FastAPI
from app.user.router import router as router_user
from app.card.router import router as router_card
from app.cart.router import router as router_cart
from app.category.router import router as router_category
from app.review.router import router as router_review
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(router_user)
app.include_router(router_card)
app.include_router(router_category)
app.include_router(router_cart)
app.include_router(router_review)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI project"}

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Authorization"]
)