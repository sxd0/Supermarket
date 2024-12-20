# app/tests/unit_tests/test_card_dao.py
import pytest
from app.card.dao import CardDAO


@pytest.mark.parametrize("skip, limit, new, popular, sale, expected_count", [
    (0, 10, None, None, None, 10),
    (0, 10, True, None, None, 2),
    (0, 10, None, True, None, 10),
    (0, 10, None, None, True, 10),
])
async def test_find_all_modified(skip, limit, new, popular, sale, expected_count):
    cards = await CardDAO.find_all_modified(skip=skip, limit=limit, new=new, popular=popular, sale=sale)
    assert len(cards) == expected_count
