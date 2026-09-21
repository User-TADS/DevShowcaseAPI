"""
Script para inicializar o banco de dados e inserir dados de exemplo realistas
para demonstração no Postman e na gravação do vídeo.
"""
import sys
import os

# Adiciona o diretório raiz ao sys.path para importações relativas
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import engine, Base, SessionLocal
from app.models import Profile, Technology, Project, Feedback


def seed_database():
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    print("[*] Criando tabelas no banco de dados...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Verifica se já há dados
        if db.query(Profile).first():
            print("[INFO] Banco de dados já possui dados cadastrados. Pulando seed.")
            return

        print("[+] Inserindo Tecnologias...")
        tech_python = Technology(name="Python", category="Backend")
        tech_fastapi = Technology(name="FastAPI", category="Backend")
        tech_react = Technology(name="React", category="Frontend")
        tech_typescript = Technology(name="TypeScript", category="Frontend")
        tech_docker = Technology(name="Docker", category="DevOps")
        tech_postgres = Technology(name="PostgreSQL", category="Database")

        technologies = [
            tech_python,
            tech_fastapi,
            tech_react,
            tech_typescript,
            tech_docker,
            tech_postgres,
        ]
        db.add_all(technologies)
        db.commit()

        print("[+] Inserindo Perfis de Desenvolvedores...")
        profile_guilherme = Profile(
            name="Guilherme Barbosa",
            email="guilherme.barbosa@example.com",
            bio="Desenvolvedor Full Stack focado em APIs de alta performance e arquitetura limpa.",
            github_url="https://github.com/GuilhermeBarbosa556",
            linkedin_url="https://linkedin.com/in/guilhermebarbosa",
        )
        profile_mariana = Profile(
            name="Mariana Souza",
            email="mariana.souza@example.com",
            bio="Engenheira de Software Frontend especializada em interfaces modernas e responsivas.",
            github_url="https://github.com/marianasouza",
            linkedin_url="https://linkedin.com/in/marianasouza",
        )
        profiles = [profile_guilherme, profile_mariana]
        db.add_all(profiles)
        db.commit()

        print("[+] Inserindo Projetos e Relacionamentos (1:N e N:N)...")
        project_devshowcase = Project(
            title="DevShowcase API",
            description="Plataforma RESTful para catalogar e avaliar portfólios de desenvolvedores.",
            repository_url="https://github.com/GuilhermeBarbosa556/devshowcase-api",
            live_url="https://devshowcase.example.com",
            profile_id=profile_guilherme.id,
        )
        project_devshowcase.technologies.extend([tech_python, tech_fastapi, tech_docker])

        project_dashboard = Project(
            title="Modern Analytics Dashboard",
            description="Painel interativo para visualização de métricas financeiras em tempo real.",
            repository_url="https://github.com/marianasouza/analytics-dashboard",
            live_url="https://analytics.example.com",
            profile_id=profile_mariana.id,
        )
        project_dashboard.technologies.extend([tech_react, tech_typescript])

        db.add_all([project_devshowcase, project_dashboard])
        db.commit()

        print("[+] Inserindo Feedbacks (Opiniões 1:N)...")
        feedback_1 = Feedback(
            author_name="Lucas Ferreira",
            rating=5,
            comment="Excelente estrutura de banco relacional e organização de camadas!",
            project_id=project_devshowcase.id,
        )
        feedback_2 = Feedback(
            author_name="Beatriz Lima",
            rating=4,
            comment="API muito rápida e documentação no Swagger impecável.",
            project_id=project_devshowcase.id,
        )
        feedback_3 = Feedback(
            author_name="Roberto Silva",
            rating=5,
            comment="Interface limpa e carregamento instantâneo dos gráficos.",
            project_id=project_dashboard.id,
        )
        db.add_all([feedback_1, feedback_2, feedback_3])
        db.commit()

        print("[OK] Dados de demonstração inseridos com sucesso!")
        print(f"   - {len(profiles)} Perfis criados")
        print(f"   - {len(technologies)} Tecnologias criadas")
        print("   - 2 Projetos criados com relacionamentos N:N e 1:N")
        print("   - 3 Feedbacks criados")
    except Exception as e:
        db.rollback()
        print(f"[ERRO] Erro ao popular dados: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
