from django.contrib import admin

from .models import (
    AnimationSettings,
    ArchitectureApiGroup,
    ArchitectureBlueprint,
    ArchitectureModule,
    ArchitectureRelationship,
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


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active")
    inlines = [SkillInline]


class ExperienceBulletInline(admin.TabularInline):
    model = ExperienceBullet
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "date", "order", "is_active")
    inlines = [ExperienceBulletInline]


class ProjectTagInline(admin.TabularInline):
    model = ProjectTag
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "order", "is_active")
    search_fields = ("title", "description")
    inlines = [ProjectTagInline]


class ArchitectureModuleInline(admin.TabularInline):
    model = ArchitectureModule
    extra = 1


class ArchitectureApiGroupInline(admin.TabularInline):
    model = ArchitectureApiGroup
    extra = 1


class ArchitectureRelationshipInline(admin.TabularInline):
    model = ArchitectureRelationship
    extra = 1


@admin.register(ArchitectureBlueprint)
class ArchitectureBlueprintAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active")
    inlines = [ArchitectureModuleInline, ArchitectureApiGroupInline, ArchitectureRelationshipInline]


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at", "is_read")
    list_filter = ("is_read", "created_at")
    readonly_fields = ("created_at",)


admin.site.register(SiteSettings)
admin.site.register(HeroContent)
admin.site.register(Metric)
admin.site.register(PipelineStep)
admin.site.register(TechStackItem)
admin.site.register(ThemeSettings)
admin.site.register(AnimationSettings)
admin.site.register(SocialLink)
