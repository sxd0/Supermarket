# app/tests/functional_tests/test_card_scenarios.py
import pytest
from httpx import AsyncClient


async def test_get_all_cards_and_specific_card(ac: AsyncClient):
    # Получение всех карточек
    response = await ac.get("/card")
    assert response.status_code == 200
    cards = response.json()

    # Получение информации о конкретной карточке
    card_id = cards[0]["id"]
    response = await ac.get(f"/card/{card_id}")
    assert response.status_code == 200
    assert response.json()["id"] == card_id
