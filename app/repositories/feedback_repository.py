from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate
from app.repositories.base import BaseRepository


class FeedbackRepository(BaseRepository[Feedback]):
    """Repositório de persistência para a entidade Feedback."""

    def __init__(self, db: Session):
        super().__init__(Feedback, db)

    def get_by_project_id(self, project_id: int) -> List[Feedback]:
        """Recupera todos os feedbacks associados a um projeto."""
        return self.db.query(Feedback).filter(Feedback.project_id == project_id).all()

    def create(self, feedback_in: FeedbackCreate, project_id: int) -> Feedback:
        """Cria e persiste um novo feedback para um projeto."""
        db_feedback = Feedback(
            author_name=feedback_in.author_name.strip(),
            rating=feedback_in.rating,
            comment=feedback_in.comment.strip(),
            project_id=project_id,
        )
        self.db.add(db_feedback)
        self.db.commit()
        self.db.refresh(db_feedback)
        return db_feedback
