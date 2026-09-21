from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict


class FeedbackBase(BaseModel):
    author_name: str = Field(..., min_length=1, max_length=100, description="Nome do autor do feedback")
    rating: int = Field(..., ge=1, le=5, description="Avaliação de 1 a 5 estrelas")
    comment: str = Field(..., min_length=3, max_length=1000, description="Comentário ou opinião sobre o projeto")

    @field_validator("author_name", "comment")
    @classmethod
    def validate_not_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("O campo não pode conter apenas espaços em branco.")
        return stripped


class FeedbackCreate(FeedbackBase):
    """DTO de entrada para criação de feedback."""
    project_id: Optional[int] = Field(None, description="ID do projeto associado")


class FeedbackResponse(FeedbackBase):
    """DTO de saída para feedback."""
    id: int
    project_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
