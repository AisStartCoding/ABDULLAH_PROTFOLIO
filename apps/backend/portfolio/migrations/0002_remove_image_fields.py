# Generated for the custom studio portfolio admin.
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="animationsettings",
            name="enable_3d",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="animationsettings",
            name="enable_particles",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="animationsettings",
            name="intensity",
            field=models.FloatField(default=0.75),
        ),
        migrations.AlterField(
            model_name="animationsettings",
            name="speed",
            field=models.FloatField(default=0.7),
        ),
        migrations.RemoveField(
            model_name="herocontent",
            name="profile_image",
        ),
        migrations.RemoveField(
            model_name="project",
            name="image",
        ),
        migrations.AlterField(
            model_name="architectureblueprint",
            name="accent",
            field=models.CharField(default="#2563eb", max_length=30),
        ),
        migrations.AlterField(
            model_name="themesettings",
            name="background",
            field=models.CharField(default="#f8fbff", max_length=30),
        ),
        migrations.AlterField(
            model_name="themesettings",
            name="primary",
            field=models.CharField(default="#2563eb", max_length=30),
        ),
        migrations.AlterField(
            model_name="themesettings",
            name="secondary",
            field=models.CharField(default="#059669", max_length=30),
        ),
        migrations.AlterField(
            model_name="themesettings",
            name="violet",
            field=models.CharField(default="#7c3aed", max_length=30),
        ),
    ]
