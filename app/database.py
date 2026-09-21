import os
from sqlalchemy import create_engine, event
from sqlalchemy.orm import declarative_base, sessionmaker
from typing import Generator

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./devshowcase.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=False,
)

# Habilita suporte a chaves estrangeiras no SQLite
if DATABASE_URL.startswith("sqlite"):
    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> Generator:
    """Dependency injection para fornecer a sessão do banco de dados por requisição."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
