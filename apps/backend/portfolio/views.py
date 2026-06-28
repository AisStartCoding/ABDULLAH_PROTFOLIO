from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    AnimationSettings,
    ArchitectureBlueprint,
    Experience,
    HeroContent,
    Metric,
    PipelineStep,
    Project,
    SiteSettings,
    SkillCategory,
    SocialLink,
    TechStackItem,
    ThemeSettings,
)
from .serializers import (
    AnimationSettingsSerializer,
    ArchitectureBlueprintSerializer,
    ContactMessageSerializer,
    ExperienceSerializer,
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
