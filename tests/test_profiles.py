import pytest


def test_create_profile_success(client):
    payload = {
        "name": "Guilherme Barbosa",
        "email": "guilherme@example.com",
        "bio": "Engenheiro de Software Backend",
        "github_url": "https://github.com/GuilhermeBarbosa556",
        "linkedin_url": "https://linkedin.com/in/guilhermebarbosa",
    }
    response = client.post("/api/profiles", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] is not None
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["github_url"] == payload["github_url"]


def test_create_profile_duplicate_email(client):
    payload = {
        "name": "Guilherme Barbosa",
        "email": "duplicado@example.com",
        "github_url": "https://github.com/guilherme",
    }
    res1 = client.post("/api/profiles", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/api/profiles", json=payload)
    assert res2.status_code == 400
    assert "já existe um perfil cadastrado" in res2.json()["detail"].lower()


def test_create_profile_invalid_url(client):
    payload = {
        "name": "Teste Invalido",
        "email": "invalido@example.com",
        "github_url": "url-sem-protocolo",
    }
    response = client.post("/api/profiles", json=payload)
    assert response.status_code == 422


def test_create_profile_blank_name(client):
    payload = {
        "name": "   ",
        "email": "blank@example.com",
        "github_url": "https://github.com/blank",
    }
    response = client.post("/api/profiles", json=payload)
    assert response.status_code == 422


def test_get_profile_by_id_success(client):
    create_res = client.post(
        "/api/profiles",
        json={
            "name": "Maria Silva",
            "email": "maria@example.com",
            "github_url": "https://github.com/mariasilva",
        },
    )
    profile_id = create_res.json()["id"]

    response = client.get(f"/api/profiles/{profile_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == profile_id
    assert data["name"] == "Maria Silva"
    assert "projects" in data
    assert isinstance(data["projects"], list)


def test_get_profile_by_id_not_found(client):
    response = client.get("/api/profiles/99999")
    assert response.status_code == 404
    assert "não encontrado" in response.json()["detail"].lower()
