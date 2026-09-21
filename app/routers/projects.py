from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.project import ProjectCreate, ProjectResponse
from app.repositories.project_repository import ProjectRepository
from app.repositories.profile_repository import ProfileRepository
from app.repositories.technology_repository import TechnologyRepository

router = APIRouter(prefix="/api/projects", tags=["Projects"])


@router.post(
    "",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar projeto",
    description="Cadastra um novo projeto vinculado a um perfil (1 : N) e associado a tecnologias (N : N) com validações de URL e integridade referencial.",
)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
):
    profile_repo = ProfileRepository(db)
    profile = profile_repo.get_by_id(project_in.profile_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Perfil com ID {project_in.profile_id} não encontrado.",
        )

    tech_repo = TechnologyRepository(db)
    technologies = []
    if project_in.technology_ids:
        technologies = tech_repo.get_by_ids(project_in.technology_ids)
        found_ids = {t.id for t in technologies}
        missing_ids = set(project_in.technology_ids) - found_ids
        if missing_ids:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Tecnologias com IDs {sorted(list(missing_ids))} não foram encontradas.",
            )

    project_repo = ProjectRepository(db)
    new_project = project_repo.create(project_in, technologies)
    # Recarrega o projeto com relacionamentos
    return project_repo.get_by_id(new_project.id)


@router.get(
    "",
    response_model=List[ProjectResponse],
    status_code=status.HTTP_200_OK,
    summary="Listar projetos",
    description="Retorna a lista de todos os projetos cadastrados com suas tecnologias, dados do autor e feedbacks.",
)
def list_projects(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    repo = ProjectRepository(db)
    return repo.get_all(skip=skip, limit=limit)


@router.get(
    "/{id}",
    response_model=ProjectResponse,
    status_code=status.HTTP_200_OK,
    summary="Buscar projeto por ID",
    description="Recupera os detalhes de um projeto específico através do seu identificador.",
)
def get_project_by_id(
    id: int,
    db: Session = Depends(get_db),
):
    repo = ProjectRepository(db)
    project = repo.get_by_id(id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Projeto com ID {id} não encontrado.",
        )
    return project
