def test_create_project_with_technologies(client):
    # 1. Cria um perfil
    profile_res = client.post(
        "/api/profiles",
        json={
            "name": "Guilherme Dev",
            "email": "dev@example.com",
            "github_url": "https://github.com/guilherme",
        },
    )
    profile_id = profile_res.json()["id"]

    # 2. Cria tecnologias
    t1 = client.post("/api/technologies", json={"name": "Python", "category": "Backend"}).json()
    t2 = client.post("/api/technologies", json={"name": "FastAPI", "category": "Backend"}).json()

    # 3. Cria projeto vinculado ao perfil e às tecnologias
    project_payload = {
        "title": "DevShowcase API",
        "description": "API completa com relacionamentos relacionais e DTOs",
        "repository_url": "https://github.com/GuilhermeBarbosa556/devshowcase-api",
        "live_url": "https://devshowcase.api.example.com",
        "profile_id": profile_id,
        "technology_ids": [t1["id"], t2["id"]],
    }
    response = client.post("/api/projects", json=project_payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] is not None
    assert data["title"] == "DevShowcase API"
    assert data["profile_id"] == profile_id
    assert data["profile"]["name"] == "Guilherme Dev"
    assert len(data["technologies"]) == 2

    # 4. Verifica se o Profile agora possui este projeto listado (1 : N)
    profile_detail = client.get(f"/api/profiles/{profile_id}").json()
    assert len(profile_detail["projects"]) == 1
    assert profile_detail["projects"][0]["title"] == "DevShowcase API"


def test_create_project_nonexistent_profile(client):
    payload = {
        "title": "Projeto Sem Autor",
        "description": "Tentativa de criar projeto para perfil que não existe",
        "repository_url": "https://github.com/teste/repo",
        "profile_id": 99999,
        "technology_ids": [],
    }
    response = client.post("/api/projects", json=payload)
    assert response.status_code == 404
    assert "perfil com id 99999 não encontrado" in response.json()["detail"].lower()


def test_create_project_nonexistent_technology(client):
    profile_res = client.post(
        "/api/profiles",
        json={
            "name": "Autor Teste",
            "email": "autor@example.com",
            "github_url": "https://github.com/autor",
        },
    )
    profile_id = profile_res.json()["id"]

    payload = {
        "title": "Projeto com Tech Inexistente",
        "description": "Tentativa com ID de tecnologia que não existe",
        "repository_url": "https://github.com/teste/repo",
        "profile_id": profile_id,
        "technology_ids": [8888, 9999],
    }
    response = client.post("/api/projects", json=payload)
    assert response.status_code == 404
    assert "tecnologias com ids [8888, 9999] não foram encontradas" in response.json()["detail"].lower()


def test_list_projects(client):
    # Cria perfil e projeto
    p = client.post(
        "/api/profiles",
        json={"name": "Dev", "email": "p@test.com", "github_url": "https://github.com/p"},
    ).json()
    client.post(
        "/api/projects",
        json={
            "title": "Projeto 1",
            "description": "Descricao do projeto 1",
            "repository_url": "https://github.com/p/1",
            "profile_id": p["id"],
        },
    )

    response = client.get("/api/projects")
    assert response.status_code == 200
    assert len(response.json()) >= 1
