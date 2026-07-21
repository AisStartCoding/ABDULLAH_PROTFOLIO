from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.trailing_slash = "/?"
router.register("studio/site-settings", views.SiteSettingsViewSet)
router.register("studio/hero", views.HeroContentViewSet)
router.register("studio/metrics", views.MetricViewSet)
router.register("studio/skill-categories", views.SkillCategoryViewSet)
router.register("studio/skills", views.SkillViewSet)
router.register("studio/experiences", views.ExperienceViewSet)
router.register("studio/experience-bullets", views.ExperienceBulletViewSet)
router.register("studio/projects", views.ProjectViewSet)
router.register("studio/project-tags", views.ProjectTagViewSet)
router.register("studio/pipeline-steps", views.PipelineStepViewSet)
router.register("studio/architecture-blueprints", views.ArchitectureBlueprintViewSet)
router.register("studio/architecture-modules", views.ArchitectureModuleViewSet)
router.register("studio/architecture-api-groups", views.ArchitectureApiGroupViewSet)
router.register("studio/architecture-relationships", views.ArchitectureRelationshipViewSet)
router.register("studio/tech-stack", views.TechStackItemViewSet)
router.register("studio/theme", views.ThemeSettingsViewSet)
router.register("studio/animation", views.AnimationSettingsViewSet)
router.register("studio/social-links", views.SocialLinkViewSet)
router.register("studio/contact-messages", views.ContactMessageViewSet)

urlpatterns = [
    path("portfolio/home", views.portfolio_home, name="portfolio-home"),
    path("contact", views.contact, name="contact"),
    path("studio/csrf", views.studio_csrf, name="studio-csrf"),
    path("studio/session", views.studio_session, name="studio-session"),
    path("studio/login", views.studio_login, name="studio-login"),
    path("studio/logout", views.studio_logout, name="studio-logout"),
]

urlpatterns += router.urls
