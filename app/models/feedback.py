from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Feedback(Base):
    """
    Entidade Feedback: Opinião/Avaliação de outros desenvolvedores sobre um projeto.
    Relacionamento: Project 1 : N Feedback (Feedback N : 1 Project)
    """
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    author_name = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)  # 1 a 5
    comment = Column(Text, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relacionamento N : 1 com Project
    project = relationship("Project", back_populates="feedbacks")

    def __repr__(self) -> str:
        return f"<Feedback(id={self.id}, author='{self.author_name}', rating={self.rating}, project_id={self.project_id})>"
