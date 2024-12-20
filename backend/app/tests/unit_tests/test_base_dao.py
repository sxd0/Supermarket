import pytest
from app.dao.base import BaseDAO
from app.card.models import Card

class TestModel(BaseDAO):
    model = Card

@pytest.mark.parametrize("card_id, expected", [
    (1, True),
    (999, False),
])
async def test_find_one_or_none(card_id, expected):
    card = await TestModel.find_one_or_none(id=card_id)
    if expected:
        assert card is not None
        assert card["id"] == card_id
    else:
        assert card is None

async def test_find_all():
    cards = await TestModel.find_all()
    assert len(cards) > 0
    assert all(card["id"] is not None for card in cards)

async def test_add():
    test_data = {
        "title": "New Test Card",
        "price": 200,
        "size": ["S", "M", "L"],
        "gender": "Female",
        "category_id": 1,
        "quantity": 20,
        "description": "New Test Description",
        "image": "new_test_image.jpg"
    }
    await TestModel.add(**test_data)
    card = await TestModel.find_one_or_none(title="New Test Card")
    assert card is not None
    assert card["title"] == "New Test Card"

async def test_delete():
    test_data = {
        "title": "Delete Test Card",
        "price": 300,
        "size": ["S", "M", "L"],
        "gender": "Male",
        "category_id": 2,
        "quantity": 30,
        "description": "Delete Test Description",
        "image": "delete_test_image.jpg"
    }
    await TestModel.add(**test_data)
    card = await TestModel.find_one_or_none(title="Delete Test Card")
    assert card is not None

    await TestModel.delete(id=card["id"])
    card = await TestModel.find_one_or_none(id=card["id"])
    assert card is None

async def test_update():
    test_data = {
        "title": "Update Test Card",
        "price": 400,
        "size": ["S", "M", "L"],
        "gender": "Female",
        "category_id": 3,
        "quantity": 40,
        "description": "Update Test Description",
        "image": "update_test_image.jpg"
    }
    await TestModel.add(**test_data)
    card = await TestModel.find_one_or_none(title="Update Test Card")
    assert card is not None

    update_data = {"title": "Updated Test Card", "price": 500}
    await TestModel.update(filter_by={"id": card["id"]}, **update_data)
    
    card = await TestModel.find_one_or_none(id=card["id"])
    assert card is not None
    assert card["title"] == "Updated Test Card"
    assert card["price"] == 500
