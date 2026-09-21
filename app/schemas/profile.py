from datetime import datetime
from typing import Optional, List
import re
from pydantic import BaseModel, Field, EmailStr, field_validator, ConfigDict

URL_REGEX = re.compile(
    r"^https?://"  # http:// or https://
    r"(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|"  # domain...
    r"localhost|"  # localhost...
    r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"  # ...or ip
    r"(?::\d+)?"  # optional port
    r"(?:/?|[/?]\S+)$",
    re.IGNORECASE,
)


class ProfileBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nome completo do desenvolvedor")
    email: EmailStr = Field(..., description="E-mail profissional único")
    bio: Optional[str] = Field(None, max_length=500, description="Biografia resumida do desenvolvedor")
    github_url: str = Field(..., description="URL válida do perfil no GitHub")
    linkedin_url: Optional[str] = Field(None, description="URL válida do perfil no LinkedIn")

    @field_validator("name")
    @classmethod
    def validate_name_not_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("O nome não pode conter apenas espaços em branco.")
        return stripped

    @field_validator("github_url")
    @classmethod
    def validate_github_url(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("A URL do GitHub é obrigatória.")
        if not URL_REGEX.match(stripped):
            raise ValueError("A URL do GitHub informada é inválida. Deve iniciar com http:// ou https:// e possuir domínio válido.")
        return stripped

    @field_validator("linkedin_url")
    @classmethod
    def validate_linkedin_url(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        stripped = value.strip()
        if not stripped:
            return None
        if not URL_REGEX.match(stripped):
            raise ValueError("A URL do LinkedIn informada é inválida. Deve iniciar com http:// ou https:// e possuir domínio válido.")
        return stripped


class ProfileCreate(ProfileBase):
    """DTO de entrada para cadastro de perfil com validações."""
    pass


class ProfileProjectSummary(BaseModel):
    """Resumo de projeto para exibição dentro do perfil."""
    id: int
    title: str
    description: str
    repository_url: str
    live_url: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProfileResponse(ProfileBase):
    """DTO de saída para dados básicos do perfil."""
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProfileDetailResponse(ProfileResponse):
    """DTO de saída detalhado incluindo projetos vinculados (Relacionamento 1 : N)."""
    projects: List[ProfileProjectSummary] = []

    model_config = ConfigDict(from_attributes=True)
