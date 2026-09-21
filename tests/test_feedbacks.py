def test_create_feedback_for_project(client):
    # Cria perfil e projeto
    profile = client.post(
        "/api/profiles",
        json={"name": "Dev Feedback", "email": "f@test.com", "github_url": "https://github.com/f"},
    ).json()

    project = client.post(
        "/api/projects",
        json={
            "title": "Projeto Avaliado",
            "description": "Projeto com avaliações e comentários",
            "repository_url": "https://github.com/f/projeto",
            "profile_id": profile["id"],
        },
    )
    project_id = project.json()["id"]

    # Cria Feedback
    fb_payload = {
        "author_name": "Revisor Sênior",
        "rating": 5,
        "comment": "Código muito bem estruturado e organizado em camadas!",
        "project_id": project_id,
    }
    response = client.post("/api/feedbacks", json=fb_payload)
    assert response.status_code == 201
    fb_data = response.json()
    assert fb_data["id"] is not None
    assert fb_data["rating"] == 5
    assert fb_data["project_id"] == project_id

    # Busca o projeto e verifica se o feedback aparece vinculado (1 : N)
    proj_detail = client.get(f"/api/projects/{project_id}").json()
    assert len(proj_detail["feedbacks"]) == 1
    assert proj_detail["feedbacks"][0]["author_name"] == "Revisor Sênior"


def test_feedback_invalid_rating(client):
    response = client.post(
        "/api/feedbacks",
        json={
            "author_name": "Tester",
            "rating": 10,  # Máximo permitido é 5
            "comment": "Nota inválida",
            "project_id": 1,
        },
    )
    assert response.status_code == 422


def test_feedback_nonexistent_project(client):
    response = client.post(
        "/api/feedbacks",
        json={
            "author_name": "Tester",
            "rating": 4,
            "comment": "Projeto inexistente",
            "project_id": 99999,
        },
    )
    assert response.status_code == 404
    assert "projeto com id 99999 não encontrado" in response.json()["detail"].lower()
