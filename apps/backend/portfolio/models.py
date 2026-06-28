from django.db import models


class OrderedModel(models.Model):
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ["order", "id"]


class SiteSettings(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=160)
    email = models.EmailField()
    location = models.CharField(max_length=120)
    open_status = models.CharField(max_length=120, default="Open to Remote")
    resume_pdf = models.FileField(upload_to="resume/", blank=True)
    seo_title = models.CharField(max_length=180)
    seo_description = models.TextField()

    class Meta:
        verbose_name_plural = "Site settings"

    def __str__(self) -> str:
        return self.name


class HeroContent(models.Model):
    headline = models.CharField(max_length=220)
    subtext = models.TextField()
    profile_image = models.ImageField(upload_to="profile/", blank=True)
    primary_button = models.CharField(max_length=80, default="View Projects")
    secondary_button = models.CharField(max_length=80, default="See Deployment Workflow")
    architecture_button = models.CharField(max_length=80, default="Architecture Lab")
    contact_button = models.CharField(max_length=80, default="Contact Me")
    terminal_title = models.CharField(max_length=120, default="deployment@abdullah")
    terminal_lines = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name_plural = "Hero content"

    def __str__(self) -> str:
        return self.headline


class Metric(OrderedModel):
    value = models.CharField(max_length=80)
    label = models.CharField(max_length=160)
    description = models.CharField(max_length=220)

    def __str__(self) -> str:
        return f"{self.value} {self.label}"


class SkillCategory(OrderedModel):
    title = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.title


class Skill(OrderedModel):
    category = models.ForeignKey(SkillCategory, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)

    def __str__(self) -> str:
        return self.name


class Experience(OrderedModel):
    title = models.CharField(max_length=160)
    company = models.CharField(max_length=160)
    date = models.CharField(max_length=80)
    location = models.CharField(max_length=120)

    def __str__(self) -> str:
        return f"{self.title} at {self.company}"


class ExperienceBullet(OrderedModel):
    experience = models.ForeignKey(Experience, related_name="bullets", on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self) -> str:
        return self.text[:80]


class Project(OrderedModel):
    title = models.CharField(max_length=180)
    status = models.CharField(max_length=80)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/", blank=True)
    architecture_notes = models.TextField(blank=True)
    detail_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.title


class ProjectTag(OrderedModel):
    project = models.ForeignKey(Project, related_name="tags", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)

    def __str__(self) -> str:
        return self.name


class PipelineStep(OrderedModel):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=220)
    command = models.CharField(max_length=180, blank=True)

    def __str__(self) -> str:
        return self.title


class ArchitectureBlueprint(OrderedModel):
    title = models.CharField(max_length=180)
    description = models.TextField()
    accent = models.CharField(max_length=30, default="#22d3ee")

    def __str__(self) -> str:
        return self.title


class ArchitectureModule(OrderedModel):
    blueprint = models.ForeignKey(ArchitectureBlueprint, related_name="modules", on_delete=models.CASCADE)
    name = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.name


class ArchitectureApiGroup(OrderedModel):
    blueprint = models.ForeignKey(ArchitectureBlueprint, related_name="api_groups", on_delete=models.CASCADE)
    path = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.path


class ArchitectureRelationship(OrderedModel):
    blueprint = models.ForeignKey(ArchitectureBlueprint, related_name="relationships", on_delete=models.CASCADE)
    source = models.CharField(max_length=120)
    target = models.CharField(max_length=120)
    label = models.CharField(max_length=120, blank=True)

    def __str__(self) -> str:
        return f"{self.source} -> {self.target}"


class TechStackItem(OrderedModel):
    name = models.CharField(max_length=80)
    category = models.CharField(max_length=80)
    icon = models.CharField(max_length=80, blank=True)

    def __str__(self) -> str:
        return self.name


class ThemeSettings(models.Model):
    primary = models.CharField(max_length=30, default="#22d3ee")
    secondary = models.CharField(max_length=30, default="#10b981")
    violet = models.CharField(max_length=30, default="#8b5cf6")
    background = models.CharField(max_length=30, default="#020617")

    class Meta:
        verbose_name_plural = "Theme settings"

    def __str__(self) -> str:
        return "Theme settings"


class AnimationSettings(models.Model):
    intensity = models.FloatField(default=0.85)
    speed = models.FloatField(default=0.75)
    enable_3d = models.BooleanField(default=True)
    enable_particles = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Animation settings"

    def __str__(self) -> str:
        return "Animation settings"


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=180)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name}: {self.subject}"


class SocialLink(OrderedModel):
    label = models.CharField(max_length=80)
    url = models.URLField()

    def __str__(self) -> str:
        return self.label
