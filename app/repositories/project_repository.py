from typing import Optional, List
from sqlalchemy.orm import Session, selectinload
from app.models.project import Project
from app.models.technology import Technology
from app.schemas.project import ProjectCreate
from app.repositories.base import BaseRepository


class ProjectRepository(BaseRepository[Project]):
    """Repositório de persistência para a entidade Project."""

    def __init__(self, db: Session):
        super().__init__(Project, db)

    def get_by_id(self, project_id: int) -> Optional[Project]:
        """Recupera projeto por ID carregando perfil, tecnologias e feedbacks."""
        return (
            self.db.query(Project)
            .options(
                selectinload(Project.profile),
                selectinload(Project.technologies),
                selectinload(Project.feedbacks),
            )
            .filter(Project.id == project_id)
            .first()
        )

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Project]:
        """Lista todos os projetos com relacionamentos carregados."""
        return (
            self.db.query(Project)
            .options(
                selectinload(Project.profile),
                selectinload(Project.technologies),
                selectinload(Project.feedbacks),
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create(self, project_in: ProjectCreate, technologies: List[Technology]) -> Project:
        """Cria e persiste um novo projeto associado a um Profile e a N Technologies."""
        db_project = Project(
            title=project_in.title.strip(),
            description=project_in.description.strip(),
            repository_url=str(project_in.repository_url),
            live_url=str(project_in.live_url) if project_in.live_url else None,
            profile_id=project_in.profile_id,
        )
        if technologies:
            db_project.technologies.extend(technologies)

        self.db.add(db_project)
        self.db.commit()
        self.db.refresh(db_project)
        return db_project
