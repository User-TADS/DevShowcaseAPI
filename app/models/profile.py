from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class Profile(Base):
    """
    Entidade Profile: Representa o perfil de um desenvolvedor na plataforma DevShowcase.
    Relacionamento: Profile 1 : N Project
    """
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    bio = Column(Text, nullable=True)
    github_url = Column(String(255), nullable=False)
    linkedin_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relacionamento 1 : N com Project
    projects = relationship(
        "Project",
        back_populates="profile",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"<Profile(id={self.id}, name='{self.name}', email='{self.email}')>"
