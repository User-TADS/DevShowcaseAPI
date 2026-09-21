from app.routers.profiles import router as profiles_router
from app.routers.technologies import router as technologies_router
from app.routers.projects import router as projects_router
from app.routers.feedbacks import router as feedbacks_router

__all__ = [
    "profiles_router",
    "technologies_router",
    "projects_router",
    "feedbacks_router",
]
