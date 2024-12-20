# app/tests/integration_tests/test_card_api.py
import pytest
from httpx import AsyncClient


@pytest.mark.parametrize("skip, limit, status_code", [
    (0, 10, 200),
    (10, 10, 200),
])
async def test_get_card(skip, limit, status_code, ac: AsyncClient):
    response = await ac.get("/card", params={"skip": skip, "limit": limit})
    assert response is not None
    assert response.status_code == status_code



@pytest.mark.parametrize("skip, limit, status_code", [
    (0, 10, 200),
    (10, 10, 200),
])
async def test_get_new_card(skip, limit, status_code, ac: AsyncClient):
    response = await ac.get("/card/new", params={"skip": skip, "limit": limit})
    assert response is not None
    assert response.status_code == status_code

