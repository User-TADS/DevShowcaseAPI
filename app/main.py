from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
import app.models  # Garante registro dos modelos no metadata
from app.routers import (
    profiles_router,
    technologies_router,
    projects_router,
    feedbacks_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Inicializa as tabelas do banco de dados na inicialização
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="DevShowcase API",
    description="""
API RESTful para a plataforma **DevShowcase**, desenvolvida como entrega da 
etapa de **Modelagem de domínio, persistência e endpoints básicos**.

### Recursos Principais:
* **Perfis (Profiles)**: Cadastro e consulta de perfis de desenvolvedores com validações estritas (URLs, e-mail único).
* **Tecnologias (Technologies)**: Cadastro e listagem de tecnologias e ferramentas.
* **Projetos (Projects)**: Cadastro e consulta de projetos associados ao desenvolvedor autor (**1 : N**) e a tecnologias (**N : N**).
* **Opiniões (Feedbacks)**: Cadastro e consulta de avaliações vinculadas a projetos (**1 : N**).
""",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configuração de CORS para permitir requisições locais e externas
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusão dos roteadores da API
app.include_router(profiles_router)
app.include_router(technologies_router)
app.include_router(projects_router)
app.include_router(feedbacks_router)


@app.get("/", tags=["Root"], summary="Endpoint Raiz com Informações da API")
def read_root():
    return {
        "message": "Bem-vindo à DevShowcase API!",
        "version": "1.0.0",
        "status": "online",
        "documentation": "/docs",
        "endpoints": {
            "profiles": "/api/profiles",
            "technologies": "/api/technologies",
            "projects": "/api/projects",
            "feedbacks": "/api/feedbacks",
        },
    }


@app.get("/health", tags=["Health"], summary="Checagem de Saúde da Aplicação")
def health_check():
    return {"status": "healthy"}
