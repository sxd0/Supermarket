import pytest
from httpx import AsyncClient


async def test_get_cart(authenticated_ac: AsyncClient):
    response = await authenticated_ac.get("/cart")
    assert response.status_code == 200
    assert len(response.json()) > 0


# @pytest.mark.parametrize("card_id, quantity, status_code", [
#     (1, 2, 200),
#     (2, 1, 200),
#     (999, 1, 404),
# ])
# async def test_add_to_cart(card_id, quantity, status_code, authenticated_ac: AsyncClient):
#     response = await authenticated_ac.post("/cart", json={"card_id": card_id, "quantity": quantity})
#     assert response.status_code == status_code
#     if status_code == 200:
#         response_json = response.json()
#         assert response_json is not None
#         assert response_json["card_id"] == card_id
#         assert response_json["quantity"] == quantity



# @pytest.mark.parametrize("user_id, cart_id, status_code", [
#     (1, 1, 200),
#     (2, 2, 200),
#     (999, 999, 404),
# ])
# async def test_remove_from_cart(user_id, cart_id, status_code, authenticated_ac: AsyncClient):
#     response = await authenticated_ac.delete(f"/cart?cart_id={cart_id}&user_id={user_id}")
#     assert response.status_code == status_code


# @pytest.mark.parametrize("user_id, cart_id, quantity, status_code", [
#     (1, 1, 3, 200),
#     (2, 2, 2, 200),
#     (999, 999, 1, 404),
# ])
# async def test_update_cart_quantity(user_id, cart_id, quantity, status_code, authenticated_ac: AsyncClient):
#     response = await authenticated_ac.put(f"/cart/update_quantity?cart_id={cart_id}&new_quantity={quantity}&user_id={user_id}")
#     assert response.status_code == status_code
#     if status_code == 200:
#         assert response.json()["quantity"] == quantity
