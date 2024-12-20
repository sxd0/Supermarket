import pytest
from app.cart.dao import CartDAO


@pytest.mark.parametrize("user_id, card_id, expected", [
    (1, 1, True),
    (2, 2, True),
    (3, 3, True),
    (999, 999, False),
])
async def test_find_one_or_none(user_id, card_id, expected):
    cart = await CartDAO.find_one_or_none(user_id=user_id, card_id=card_id)
    if expected:
        assert cart is not None
        assert cart["user_id"] == user_id
        assert cart["card_id"] == card_id
    else:
        assert cart is None


async def test_add():
    test_data = {
        "user_id": 2,
        "card_id": 4,
        "quantity": 2
    }
    await CartDAO.add(**test_data)
    cart = await CartDAO.find_one_or_none(user_id=2, card_id=4)
    assert cart is not None
    assert cart["user_id"] == 2
    assert cart["card_id"] == 4
    assert cart["quantity"] == 2

async def test_delete():
    test_data = {
        "user_id": 2,
        "card_id": 5,
        "quantity": 1
    }
    await CartDAO.add(**test_data)
    cart = await CartDAO.find_one_or_none(user_id=2, card_id=5)
    assert cart is not None

    await CartDAO.delete(user_id=2, card_id=5)
    cart = await CartDAO.find_one_or_none(user_id=2, card_id=5)
    assert cart is None


async def test_update():
    test_data = {
        "user_id": 2,
        "card_id": 6,
        "quantity": 1
    }
    await CartDAO.add(**test_data)
    cart = await CartDAO.find_one_or_none(user_id=2, card_id=6)
    assert cart is not None

    update_data = {"quantity": 3}
    await CartDAO.update(filter_by={"user_id": 2, "card_id": 6}, **update_data)
    cart = await CartDAO.find_one_or_none(user_id=2, card_id=6)
    assert cart is not None
    assert cart["quantity"] == 3
