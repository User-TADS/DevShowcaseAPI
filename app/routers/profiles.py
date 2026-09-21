from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.profile import ProfileCreate, ProfileResponse, ProfileDetailResponse
from app.repositories.profile_repository import ProfileRepository

router = APIRouter(prefix="/api/profiles", tags=["Profiles"])


@router.post(
    "",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar perfil de desenvolvedor",
    description="Cria um novo perfil de desenvolvedor validando e-mail único, URLs válidas e campos obrigatórios.",
)
def create_profile(
    profile_in: ProfileCreate,
    db: Session = Depends(get_db),
):
    repo = ProfileRepository(db)
    existing_profile = repo.get_by_email(profile_in.email)
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Já existe um perfil cadastrado com o e-mail '{profile_in.email}'.",
        )
    return repo.create(profile_in)


@router.get(
    "/{id}",
    response_model=ProfileDetailResponse,
    status_code=status.HTTP_200_OK,
    summary="Buscar perfil por ID",
    description="Recupera os detalhes completos de um perfil pelo seu ID, incluindo seus projetos vinculados (1 : N).",
)
def get_profile_by_id(
    id: int,
    db: Session = Depends(get_db),
):
    repo = ProfileRepository(db)
    profile = repo.get_by_id(id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Perfil com ID {id} não encontrado.",
        )
    return profile


@router.get(
    "",
    response_model=List[ProfileResponse],
    status_code=status.HTTP_200_OK,
    summary="Listar perfis",
    description="Lista todos os perfis de desenvolvedores cadastrados na plataforma.",
)
def list_profiles(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    repo = ProfileRepository(db)
    return repo.get_all(skip=skip, limit=limit)
