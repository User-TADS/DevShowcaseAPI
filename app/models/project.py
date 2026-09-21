from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.associations import project_technologies


class Project(Base):
    """
    Entidade Project: Representa um projeto desenvolvido e publicado por um perfil.
    Relacionamentos:
    - Profile 1 : N Project
    - Project N : N Technology
    - Project 1 : N Feedback
    """
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(150), nullable=False, index=True)
    description = Column(Text, nullable=False)
    repository_url = Column(String(255), nullable=False)
    live_url = Column(String(255), nullable=True)
    profile_id = Column(Integer, ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relacionamento N : 1 com Profile
    profile = relationship("Profile", back_populates="projects")

    # Relacionamento N : N com Technology
    technologies = relationship(
        "Technology",
        secondary=project_technologies,
        back_populates="projects",
        lazy="selectin",
    )

    # Relacionamento 1 : N com Feedback
    feedbacks = relationship(
        "Feedback",
        back_populates="project",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"<Project(id={self.id}, title='{self.title}', profile_id={self.profile_id})>"
