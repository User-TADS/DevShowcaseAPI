from typing import Optional, List
from sqlalchemy.orm import Session, selectinload
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate
from app.repositories.base import BaseRepository


class ProfileRepository(BaseRepository[Profile]):
    """Repositório de persistência para a entidade Profile."""

    def __init__(self, db: Session):
        super().__init__(Profile, db)

    def get_by_id(self, profile_id: int) -> Optional[Profile]:
        """Recupera o perfil por ID com seus projetos relacionados carregados."""
        return (
            self.db.query(Profile)
            .options(selectinload(Profile.projects))
            .filter(Profile.id == profile_id)
            .first()
        )

    def get_by_email(self, email: str) -> Optional[Profile]:
        """Busca perfil por e-mail para verificação de unicidade."""
        return self.db.query(Profile).filter(Profile.email == email).first()

    def create(self, profile_in: ProfileCreate) -> Profile:
        """Cria e persiste um novo perfil no banco de dados."""
        db_profile = Profile(
            name=profile_in.name,
            email=profile_in.email,
            bio=profile_in.bio,
            github_url=str(profile_in.github_url),
            linkedin_url=str(profile_in.linkedin_url) if profile_in.linkedin_url else None,
        )
        self.db.add(db_profile)
        self.db.commit()
        self.db.refresh(db_profile)
        return db_profile
