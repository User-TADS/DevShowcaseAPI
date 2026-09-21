from datetime import datetime
from pydantic import BaseModel, Field, field_validator, ConfigDict


class TechnologyBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=80, description="Nome da tecnologia")
    category: str = Field(..., min_length=1, max_length=50, description="Categoria (ex: Backend, Frontend, DevOps)")

    @field_validator("name", "category")
    @classmethod
    def validate_not_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("O campo não pode conter apenas espaços em branco.")
        return stripped


class TechnologyCreate(TechnologyBase):
    """DTO de entrada para criação de tecnologia com validações."""
    pass


class TechnologyResponse(TechnologyBase):
    """DTO de saída para tecnologia."""
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
