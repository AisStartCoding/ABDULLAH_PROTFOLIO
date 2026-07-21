# Generated manually for the command center portfolio.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AnimationSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("intensity", models.FloatField(default=0.85)),
                ("speed", models.FloatField(default=0.75)),
                ("enable_3d", models.BooleanField(default=True)),
                ("enable_particles", models.BooleanField(default=True)),
            ],
            options={"verbose_name_plural": "Animation settings"},
        ),
        migrations.CreateModel(
            name="ArchitectureBlueprint",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("title", models.CharField(max_length=180)),
                ("description", models.TextField()),
                ("accent", models.CharField(default="#22d3ee", max_length=30)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="ContactMessage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254)),
                ("subject", models.CharField(max_length=180)),
                ("message", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("is_read", models.BooleanField(default=False)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Experience",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("title", models.CharField(max_length=160)),
                ("company", models.CharField(max_length=160)),
                ("date", models.CharField(max_length=80)),
                ("location", models.CharField(max_length=120)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="HeroContent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("headline", models.CharField(max_length=220)),
                ("subtext", models.TextField()),
                ("profile_image", models.ImageField(blank=True, upload_to="profile/")),
                ("primary_button", models.CharField(default="View Projects", max_length=80)),
                ("secondary_button", models.CharField(default="See Deployment Workflow", max_length=80)),
                ("architecture_button", models.CharField(default="Architecture Lab", max_length=80)),
                ("contact_button", models.CharField(default="Contact Me", max_length=80)),
                ("terminal_title", models.CharField(default="deployment@abdullah", max_length=120)),
                ("terminal_lines", models.JSONField(blank=True, default=list)),
            ],
            options={"verbose_name_plural": "Hero content"},
        ),
        migrations.CreateModel(
            name="Metric",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("value", models.CharField(max_length=80)),
                ("label", models.CharField(max_length=160)),
                ("description", models.CharField(max_length=220)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="PipelineStep",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("title", models.CharField(max_length=120)),
                ("description", models.CharField(max_length=220)),
                ("command", models.CharField(blank=True, max_length=180)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("title", models.CharField(max_length=180)),
                ("status", models.CharField(max_length=80)),
                ("description", models.TextField()),
                ("image", models.ImageField(blank=True, upload_to="projects/")),
                ("architecture_notes", models.TextField(blank=True)),
                ("detail_url", models.URLField(blank=True)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="SiteSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("role", models.CharField(max_length=160)),
                ("email", models.EmailField(max_length=254)),
                ("location", models.CharField(max_length=120)),
                ("open_status", models.CharField(default="Open to Remote", max_length=120)),
                ("resume_pdf", models.FileField(blank=True, upload_to="resume/")),
                ("seo_title", models.CharField(max_length=180)),
                ("seo_description", models.TextField()),
            ],
            options={"verbose_name_plural": "Site settings"},
        ),
        migrations.CreateModel(
            name="SkillCategory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("title", models.CharField(max_length=120)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="SocialLink",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("label", models.CharField(max_length=80)),
                ("url", models.URLField()),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="TechStackItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("name", models.CharField(max_length=80)),
                ("category", models.CharField(max_length=80)),
                ("icon", models.CharField(blank=True, max_length=80)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="ThemeSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("primary", models.CharField(default="#22d3ee", max_length=30)),
                ("secondary", models.CharField(default="#10b981", max_length=30)),
                ("violet", models.CharField(default="#8b5cf6", max_length=30)),
                ("background", models.CharField(default="#020617", max_length=30)),
            ],
            options={"verbose_name_plural": "Theme settings"},
        ),
        migrations.CreateModel(
            name="ArchitectureApiGroup",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("path", models.CharField(max_length=120)),
                ("blueprint", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="api_groups", to="portfolio.architectureblueprint")),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="ArchitectureModule",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("name", models.CharField(max_length=120)),
                ("blueprint", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="modules", to="portfolio.architectureblueprint")),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="ArchitectureRelationship",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("source", models.CharField(max_length=120)),
                ("target", models.CharField(max_length=120)),
                ("label", models.CharField(blank=True, max_length=120)),
                ("blueprint", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="relationships", to="portfolio.architectureblueprint")),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="ExperienceBullet",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("text", models.TextField()),
                ("experience", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="bullets", to="portfolio.experience")),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="ProjectTag",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("name", models.CharField(max_length=80)),
                ("project", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="tags", to="portfolio.project")),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="Skill",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("name", models.CharField(max_length=80)),
                ("category", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="skills", to="portfolio.skillcategory")),
            ],
            options={"ordering": ["order", "id"]},
        ),
    ]
