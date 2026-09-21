from typing import Generic, TypeVar, Type, Optional, List
from sqlalchemy.orm import Session
from app.database import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """Repositório base genérico com operações fundamentais de CRUD."""

    def __init__(self, model: Type[ModelType], db: Session):
        self.model = model
        self.db = db

    def get_by_id(self, id: int) -> Optional[ModelType]:
        return self.db.query(self.model).filter(self.model.id == id).first()

    def get_all(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        return self.db.query(self.model).offset(skip).limit(limit).all()

    def delete(self, id: int) -> bool:
        instance = self.get_by_id(id)
        if instance:
            self.db.delete(instance)
            self.db.commit()
            return True
        return False
