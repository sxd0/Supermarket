import pytest

from httpx import AsyncClient


@pytest.mark.parametrize("email, password, name, surname, status_code", [
    ("kot@pes.com", "kotopes", "kot", "pes", 200),
    ("kot@pes.com", "kot0pes", "kot", "pes", 400),
    ("pes@kot.com", "pesokot", "kot", "pes", 200),
    ("abcde", "pesokot", "kot", "pes", 422),
])
async def test_register_user(email, password, name, surname, status_code, ac: AsyncClient):
    response = await ac.post("/auth/register", json={
        "email": email,
        "password": password,
        "name": name,
        "surname": surname,
    })

    assert response.status_code == status_code

@pytest.mark.parametrize("email, password, status_code", [
    ("admin@123.com", "123", 200),
])
async def test_login_user(email, password,  status_code, ac: AsyncClient):
    response = await ac.post("/auth/login", json={
        "email": email,
        "password": password,
    })

    assert response.status_code == status_code