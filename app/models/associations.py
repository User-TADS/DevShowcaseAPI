from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database import Base

# Tabela intermediária para relacionamento N : N entre Project e Technology
project_technologies = Table(
    "project_technologies",
    Base.metadata,
    Column("project_id", Integer, ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True),
    Column("technology_id", Integer, ForeignKey("technologies.id", ondelete="CASCADE"), primary_key=True),
)
