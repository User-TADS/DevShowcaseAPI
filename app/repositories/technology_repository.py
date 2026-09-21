from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.technology import Technology
from app.schemas.technology import TechnologyCreate
from app.repositories.base import BaseRepository


class TechnologyRepository(BaseRepository[Technology]):
    """Repositório de persistência para a entidade Technology."""

    def __init__(self, db: Session):
        super().__init__(Technology, db)

    def get_by_name(self, name: str) -> Optional[Technology]:
        """Busca tecnologia pelo nome para garantir unicidade."""
        return self.db.query(Technology).filter(Technology.name.ilike(name.strip())).first()

    def get_by_ids(self, ids: List[int]) -> List[Technology]:
        """Busca lista de tecnologias através de uma lista de IDs."""
        if not ids:
            return []
        return self.db.query(Technology).filter(Technology.id.in_(ids)).all()

    def create(self, tech_in: TechnologyCreate) -> Technology:
        """Cria e persiste uma nova tecnologia."""
        db_tech = Technology(
            name=tech_in.name.strip(),
            category=tech_in.category.strip(),
        )
        self.db.add(db_tech)
        self.db.commit()
        self.db.refresh(db_tech)
        return db_tech
