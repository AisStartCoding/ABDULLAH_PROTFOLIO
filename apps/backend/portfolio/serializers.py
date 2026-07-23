from rest_framework import serializers

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


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class HeroContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroContent
        fields = "__all__"


class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = ("id", "value", "label", "description", "order")


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("id", "name", "order")


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = SkillCategory
        fields = ("id", "title", "order", "skills")


class ExperienceBulletSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceBullet
        fields = ("id", "text", "order")


class ExperienceSerializer(serializers.ModelSerializer):
    bullets = ExperienceBulletSerializer(many=True)

    class Meta:
        model = Experience
        fields = ("id", "title", "company", "date", "location", "order", "bullets")


class ProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTag
        fields = ("id", "name", "order")


class ProjectSerializer(serializers.ModelSerializer):
    tags = ProjectTagSerializer(many=True)

    class Meta:
        model = Project
        fields = ("id", "title", "status", "description", "architecture_notes", "detail_url", "order", "tags")


class PipelineStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = PipelineStep
        fields = ("id", "title", "description", "command", "order")


class ArchitectureModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectureModule
        fields = ("id", "name", "order")


class ArchitectureApiGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectureApiGroup
        fields = ("id", "path", "order")


class ArchitectureRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectureRelationship
        fields = ("id", "source", "target", "label", "order")


class ArchitectureBlueprintSerializer(serializers.ModelSerializer):
    modules = ArchitectureModuleSerializer(many=True)
    api_groups = ArchitectureApiGroupSerializer(many=True)
    relationships = ArchitectureRelationshipSerializer(many=True)

    class Meta:
        model = ArchitectureBlueprint
        fields = ("id", "title", "description", "accent", "order", "modules", "api_groups", "relationships")


class TechStackItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStackItem
        fields = ("id", "name", "category", "icon", "order")


class ThemeSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeSettings
        fields = "__all__"


class AnimationSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimationSettings
        fields = "__all__"


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ("id", "title", "issuer", "category", "description", "completed_at", "credential_url", "order")


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ("id", "label", "url", "order")


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ("name", "email", "subject", "message")


class StudioContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"


class StudioSiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class StudioHeroContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroContent
        fields = "__all__"


class StudioProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class StudioProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTag
        fields = "__all__"


class StudioExperienceBulletSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceBullet
        fields = "__all__"


class StudioSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class StudioSkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = "__all__"


class StudioExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class StudioArchitectureBlueprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectureBlueprint
        fields = "__all__"


class StudioArchitectureModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectureModule
        fields = "__all__"


class StudioArchitectureApiGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectureApiGroup
        fields = "__all__"


class StudioArchitectureRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitectureRelationship
        fields = "__all__"
