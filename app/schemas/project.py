from datetime import datetime
from typing import Optional, List
import re
from pydantic import BaseModel, Field, field_validator, ConfigDict
from app.schemas.technology import TechnologyResponse
from app.schemas.feedback import FeedbackResponse

URL_REGEX = re.compile(
    r"^https?://"
    r"(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|"
    r"localhost|"
    r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
    r"(?::\d+)?"
    r"(?:/?|[/?]\S+)$",
    re.IGNORECASE,
)


class ProjectBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=150, description="Título do projeto")
    description: str = Field(..., min_length=5, description="Descrição detalhada do projeto")
    repository_url: str = Field(..., description="URL válida do repositório de código (ex: GitHub)")
    live_url: Optional[str] = Field(None, description="URL pública da aplicação em execução")

    @field_validator("title", "description")
    @classmethod
    def validate_not_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("O campo não pode conter apenas espaços em branco.")
        return stripped

    @field_validator("repository_url")
    @classmethod
    def validate_repository_url(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("A URL do repositório é obrigatória.")
        if not URL_REGEX.match(stripped):
            raise ValueError("A URL do repositório é inválida. Deve iniciar com http:// ou https://.")
        return stripped

    @field_validator("live_url")
    @classmethod
    def validate_live_url(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        stripped = value.strip()
        if not stripped:
            return None
        if not URL_REGEX.match(stripped):
            raise ValueError("A URL live é inválida. Deve iniciar com http:// ou https://.")
        return stripped


class ProjectCreate(ProjectBase):
    """DTO de entrada para cadastro de projeto com validações e vinculação de tecnologias."""
    profile_id: int = Field(..., description="ID do perfil de desenvolvedor autor do projeto (1 : N)")
    technology_ids: List[int] = Field(default=[], description="Lista de IDs de tecnologias associadas (N : N)")


class ProjectProfileSummary(BaseModel):
    """Resumo do autor (Profile) para ser exibido junto ao projeto."""
    id: int
    name: str
    email: str

    model_config = ConfigDict(from_attributes=True)


class ProjectResponse(ProjectBase):
    """DTO de saída padrão para projetos, incluindo autor, tecnologias e feedbacks."""
    id: int
    profile_id: int
    created_at: datetime
    profile: Optional[ProjectProfileSummary] = None
    technologies: List[TechnologyResponse] = []
    feedbacks: List[FeedbackResponse] = []

    model_config = ConfigDict(from_attributes=True)
