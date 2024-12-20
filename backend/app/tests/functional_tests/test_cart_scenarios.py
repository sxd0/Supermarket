# import pytest
# from httpx import AsyncClient

# @pytest.mark.asyncio
# async def test_add_and_remove_from_cart(authenticated_ac: AsyncClient):
#     # Добавление товара в корзину
#     response = await authenticated_ac.post("/cart", json={"card_id": 1, "quantity": 2})
#     assert response.status_code == 200
#     response_json = response.json()
#     assert response_json is not None
#     assert response_json["card_id"] == 1
#     assert response_json["quantity"] == 2

#     # Удаление товара из корзины
#     response = await authenticated_ac.delete("/cart?cart_id=1")
#     assert response.status_code == 200

#     # Проверка, что корзина пуста
#     response = await authenticated_ac.get("/cart")
#     assert response.status_code == 200
#     assert len(response.json()) == 0
