"""Smoke tests for the four endpoints the frontend calls."""

import copy
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

import app as server  # noqa: E402

USER = {
    "age": 29,
    "sex": "f",
    "height": 66,
    "orientation": "straight",
    "body_type": "athletic",
    "diet": "anything",
    "diet_modifier": "mostly",
    "drinks": "socially",
    "smokes": "no",
    "drugs": "never",
    "sign": "leo",
    "sign_modifier": "no specified sign modifier",
    "income": 80000.0,
    "job": "science / tech / engineering",
    "status": "single",
    "education_status": "graduated from",
    "education_institution": "college/university",
    "offspring_status": "doesn't have kids",
    "offspring_future": "might want",
    "pets_cats": "likes cats",
    "pets_dogs": "likes dogs",
    "religion_type": "agnosticism",
    "religion_modifier": "not too serious about it",
    "ethnicities": ["white", "asian"],
    "speaks": ["english", "german", "french"],
}
PROFILES = 842


@pytest.fixture
def client():
    return server.app.test_client()


def post(client, path, mode=1):
    response = client.post(path, json={"threshold": 0.6, "mode": mode, "data": copy.deepcopy(USER)})
    assert response.status_code == 200
    return response.get_json(force=True)


@pytest.mark.parametrize("mode", [0, 1])
def test_users_nonstd_returns_clustered_profiles(client, mode):
    users = post(client, "/api/post/users/nonstd", mode)
    assert len(users) == PROFILES
    assert {row["Segment"] for row in users} == {"first", "second", "third", "fourth"}
    assert {row["Label"] for row in users} <= {0, 1}


def test_users_std_appends_the_user(client):
    assert len(post(client, "/api/post/users/std")) == PROFILES + 1


def test_user_std_and_radar(client):
    (user,) = post(client, "/api/post/user/std")
    assert user["age"] == -0.21  # same value as with the 2022 stack

    profile = post(client, "/api/post/users/nonstd")[5]
    response = client.post("/api/post/user/std/radar", json={"data": profile})
    assert response.status_code == 200
    assert len(response.get_json(force=True)) == 1
