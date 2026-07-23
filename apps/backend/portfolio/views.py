from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response

from .models import (
    AnimationSettings,
    ArchitectureApiGroup,
    ArchitectureBlueprint,
    ArchitectureModule,
    ArchitectureRelationship,
    Certificate,
    ContactMessage,
    Experience,
    ExperienceBullet,
    HeroContent,
    Metric,
    PipelineStep,
    Project,
    ProjectTag,
    SiteSettings,
    Skill,
    SkillCategory,
    SocialLink,
    TechStackItem,
    ThemeSettings,
)
from .serializers import (
    AnimationSettingsSerializer,
    ArchitectureBlueprintSerializer,
    CertificateSerializer,
    ContactMessageSerializer,
    ExperienceSerializer,
    StudioArchitectureApiGroupSerializer,
    StudioArchitectureModuleSerializer,
    StudioArchitectureRelationshipSerializer,
    StudioContactMessageSerializer,
    StudioExperienceBulletSerializer,
    StudioExperienceSerializer,
    StudioHeroContentSerializer,
    StudioArchitectureBlueprintSerializer,
    StudioProjectSerializer,
    StudioProjectTagSerializer,
    StudioSiteSettingsSerializer,
    StudioSkillCategorySerializer,
    StudioSkillSerializer,
    HeroContentSerializer,
    MetricSerializer,
    PipelineStepSerializer,
    ProjectSerializer,
    SiteSettingsSerializer,
    SkillCategorySerializer,
    SocialLinkSerializer,
    TechStackItemSerializer,
    ThemeSettingsSerializer,
)


OWNER_USERNAME = "Abdullah"


class IsOwnerUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.username == OWNER_USERNAME)


class StudioModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerUser]


class SiteSettingsViewSet(StudioModelViewSet):
    queryset = SiteSettings.objects.all().order_by("id")
    serializer_class = StudioSiteSettingsSerializer


class HeroContentViewSet(StudioModelViewSet):
    queryset = HeroContent.objects.all().order_by("id")
    serializer_class = StudioHeroContentSerializer


class MetricViewSet(StudioModelViewSet):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer


class SkillCategoryViewSet(StudioModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = StudioSkillCategorySerializer


class SkillViewSet(StudioModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = StudioSkillSerializer


class ExperienceViewSet(StudioModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = StudioExperienceSerializer


class ExperienceBulletViewSet(StudioModelViewSet):
    queryset = ExperienceBullet.objects.all()
    serializer_class = StudioExperienceBulletSerializer


class ProjectViewSet(StudioModelViewSet):
    queryset = Project.objects.all()
    serializer_class = StudioProjectSerializer


class ProjectTagViewSet(StudioModelViewSet):
    queryset = ProjectTag.objects.all()
    serializer_class = StudioProjectTagSerializer


class PipelineStepViewSet(StudioModelViewSet):
    queryset = PipelineStep.objects.all()
    serializer_class = PipelineStepSerializer


class ArchitectureBlueprintViewSet(StudioModelViewSet):
    queryset = ArchitectureBlueprint.objects.all()
    serializer_class = StudioArchitectureBlueprintSerializer


class ArchitectureModuleViewSet(StudioModelViewSet):
    queryset = ArchitectureModule.objects.all()
    serializer_class = StudioArchitectureModuleSerializer


class ArchitectureApiGroupViewSet(StudioModelViewSet):
    queryset = ArchitectureApiGroup.objects.all()
    serializer_class = StudioArchitectureApiGroupSerializer


class ArchitectureRelationshipViewSet(StudioModelViewSet):
    queryset = ArchitectureRelationship.objects.all()
    serializer_class = StudioArchitectureRelationshipSerializer


class TechStackItemViewSet(StudioModelViewSet):
    queryset = TechStackItem.objects.all()
    serializer_class = TechStackItemSerializer


class ThemeSettingsViewSet(StudioModelViewSet):
    queryset = ThemeSettings.objects.all().order_by("id")
    serializer_class = ThemeSettingsSerializer


class AnimationSettingsViewSet(StudioModelViewSet):
    queryset = AnimationSettings.objects.all().order_by("id")
    serializer_class = AnimationSettingsSerializer


class CertificateViewSet(StudioModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class SocialLinkViewSet(StudioModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer


class ContactMessageViewSet(StudioModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = StudioContactMessageSerializer


@api_view(["GET"])
def portfolio_home(request):
    settings = SiteSettings.objects.first()
    hero = HeroContent.objects.first()
    theme = ThemeSettings.objects.first()
    animation = AnimationSettings.objects.first()

    data = {
        "settings": SiteSettingsSerializer(settings, context={"request": request}).data if settings else None,
        "hero": HeroContentSerializer(hero, context={"request": request}).data if hero else None,
        "metrics": MetricSerializer(Metric.objects.filter(is_active=True), many=True).data,
        "skill_categories": SkillCategorySerializer(
            SkillCategory.objects.filter(is_active=True).prefetch_related("skills"),
            many=True,
        ).data,
        "experiences": ExperienceSerializer(
            Experience.objects.filter(is_active=True).prefetch_related("bullets"),
            many=True,
        ).data,
        "projects": ProjectSerializer(
            Project.objects.filter(is_active=True).prefetch_related("tags"),
            many=True,
            context={"request": request},
        ).data,
        "pipeline_steps": PipelineStepSerializer(PipelineStep.objects.filter(is_active=True), many=True).data,
        "architecture_blueprints": ArchitectureBlueprintSerializer(
            ArchitectureBlueprint.objects.filter(is_active=True).prefetch_related("modules", "api_groups", "relationships"),
            many=True,
        ).data,
        "tech_stack": TechStackItemSerializer(TechStackItem.objects.filter(is_active=True), many=True).data,
        "certificates": CertificateSerializer(Certificate.objects.filter(is_active=True), many=True).data,
        "theme": ThemeSettingsSerializer(theme).data if theme else None,
        "animation": AnimationSettingsSerializer(animation).data if animation else None,
        "social_links": SocialLinkSerializer(SocialLink.objects.filter(is_active=True), many=True).data,
    }
    return Response(data)


@api_view(["POST"])
def contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"detail": "Message received."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@ensure_csrf_cookie
def studio_csrf(request):
    return Response({"detail": "CSRF cookie set."})


@api_view(["GET"])
def studio_session(request):
    user = request.user
    is_owner = bool(user and user.is_authenticated and user.username == OWNER_USERNAME)
    return Response({"authenticated": is_owner, "username": user.username if is_owner else ""})


@api_view(["POST"])
def studio_login(request):
    username = request.data.get("username", "")
    password = request.data.get("password", "")

    user = authenticate(request, username=username, password=password)
    if not user or user.username != OWNER_USERNAME:
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

    login(request, user)
    return Response({"authenticated": True, "username": user.username})


@api_view(["POST"])
def studio_logout(request):
    logout(request)
    return Response({"detail": "Logged out."})
