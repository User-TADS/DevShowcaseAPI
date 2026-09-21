from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.feedback import FeedbackCreate, FeedbackResponse
from app.repositories.feedback_repository import FeedbackRepository
from app.repositories.project_repository import ProjectRepository

router = APIRouter(prefix="/api/feedbacks", tags=["Feedbacks"])


@router.post(
    "",
    response_model=FeedbackResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar feedback para projeto",
    description="Registra uma opinião e avaliação (nota de 1 a 5) associada a um projeto específico (1 : N).",
)
def create_feedback(
    feedback_in: FeedbackCreate,
    db: Session = Depends(get_db),
):
    if not feedback_in.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O campo 'project_id' é obrigatório para registrar um feedback.",
        )

    project_repo = ProjectRepository(db)
    project = project_repo.get_by_id(feedback_in.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Projeto com ID {feedback_in.project_id} não encontrado.",
        )

    feedback_repo = FeedbackRepository(db)
    return feedback_repo.create(feedback_in, project_id=feedback_in.project_id)


@router.get(
    "/project/{project_id}",
    response_model=List[FeedbackResponse],
    status_code=status.HTTP_200_OK,
    summary="Listar feedbacks de um projeto",
    description="Retorna todas as opiniões e notas registradas para um determinado projeto.",
)
def list_feedbacks_by_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project_repo = ProjectRepository(db)
    project = project_repo.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Projeto com ID {project_id} não encontrado.",
        )

    feedback_repo = FeedbackRepository(db)
    return feedback_repo.get_by_project_id(project_id)
