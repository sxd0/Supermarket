import asyncio
import json
import pytest
from sqlalchemy import insert
from app.card.models import Card
from app.cart.models import Cart
from app.category.models import Category
from app.database import Base, async_session_maker, engine
from app.config import settings
from app.review.models import Review
from app.user.models import User
from app.user.role.models import Role
from fastapi.testclient import TestClient
from httpx import AsyncClient
from app.main import app as fastapi_app


@pytest.fixture(scope="session", autouse=True)
async def prepare_database():
    assert settings.MODE == "TEST"

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    def open_mock_json(model: str):
        with open(f"app/tests/mock_{model}.json", encoding="utf-8") as file:
            return json.load(file)
        
    category = open_mock_json("category")
    role = open_mock_json("role")
    user = open_mock_json("user")
    card = open_mock_json("card")
    cart = open_mock_json("cart")
    review = open_mock_json("review")

    

    async with async_session_maker() as session:
        add_category = insert(Category).values(category)
        add_role = insert(Role).values(role)
        add_user = insert(User).values(user)
        add_card = insert(Card).values(card)
        add_cart = insert(Cart).values(cart)
        add_review = insert(Review).values(review)

        await session.execute(add_category)
        await session.execute(add_role)
        await session.execute(add_user)
        await session.execute(add_card)
        await session.execute(add_cart)
        await session.execute(add_review)

        await session.commit()

@pytest.fixture(scope="session")
async def ac():
    async with AsyncClient(app=fastapi_app, base_url="http://test") as ac:
        yield ac

@pytest.fixture(scope="session")
async def authenticated_ac():
    async with AsyncClient(app=fastapi_app, base_url="http://test") as ac:
        await ac.post("auth/login", json={
            "email": "test@test.com",
            "password": "test",
        })
        assert ac.cookies["access_token"]
        yield ac

@pytest.fixture(scope="session")
def event_loop(request):
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


