from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.associations import project_technologies


class Technology(Base):
    """
    Entidade Technology: Representa uma tecnologia, linguagem ou framework.
    Relacionamento: Technology N : N Project
    """
    __tablename__ = "technologies"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(80), unique=True, index=True, nullable=False)
    category = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relacionamento N : N com Project
    projects = relationship(
        "Project",
        secondary=project_technologies,
        back_populates="technologies",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"<Technology(id={self.id}, name='{self.name}', category='{self.category}')>"
