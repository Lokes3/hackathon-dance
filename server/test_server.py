from fastapi.testclient import TestClient

from .server import app

client = TestClient(app)


def test_read_main():
    data = {"title": "test", "dimensions": {}, "choreography": []}
    response = client.post("/dances/", json=data)
    assert response.status_code == 200
    assert response.json() == {
        "success": True,
    }
