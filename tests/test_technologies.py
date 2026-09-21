def test_create_technology_success(client):
    payload = {
        "name": "FastAPI",
        "category": "Backend",
    }
    response = client.post("/api/technologies", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] is not None
    assert data["name"] == "FastAPI"
    assert data["category"] == "Backend"


def test_create_technology_duplicate(client):
    payload = {
        "name": "Python",
        "category": "Backend",
    }
    res1 = client.post("/api/technologies", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/api/technologies", json=payload)
    assert res2.status_code == 400
    assert "já está cadastrada" in res2.json()["detail"].lower()


def test_create_technology_empty_fields(client):
    payload = {
        "name": "   ",
        "category": "",
    }
    response = client.post("/api/technologies", json=payload)
    assert response.status_code == 422


def test_list_technologies(client):
    client.post("/api/technologies", json={"name": "Docker", "category": "DevOps"})
    client.post("/api/technologies", json={"name": "React", "category": "Frontend"})

    response = client.get("/api/technologies")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    names = [t["name"] for t in data]
    assert "Docker" in names
    assert "React" in names
