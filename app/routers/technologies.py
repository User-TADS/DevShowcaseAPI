from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.technology import TechnologyCreate, TechnologyResponse
from app.repositories.technology_repository import TechnologyRepository

router = APIRouter(prefix="/api/technologies", tags=["Technologies"])


@router.post(
    "",
    response_model=TechnologyResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar tecnologia",
    description="Cadastra uma nova tecnologia no sistema com validação de nome único e campos não vazios.",
)
def create_technology(
    tech_in: TechnologyCreate,
    db: Session = Depends(get_db),
):
    repo = TechnologyRepository(db)
    existing_tech = repo.get_by_name(tech_in.name)
    if existing_tech:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"A tecnologia '{tech_in.name}' já está cadastrada.",
        )
    return repo.create(tech_in)


@router.get(
    "",
    response_model=List[TechnologyResponse],
    status_code=status.HTTP_200_OK,
    summary="Listar tecnologias",
    description="Retorna a lista completa de todas as tecnologias disponíveis na plataforma.",
)
def list_technologies(
    db: Session = Depends(get_db),
):
    repo = TechnologyRepository(db)
    return repo.get_all()
