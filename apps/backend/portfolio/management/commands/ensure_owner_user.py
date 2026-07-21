import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Create or update the single portfolio studio owner user."

    def handle(self, *args, **options):
        password = os.getenv("PORTFOLIO_OWNER_PASSWORD")
        if not password:
            raise CommandError("Set PORTFOLIO_OWNER_PASSWORD before running this command.")

        User = get_user_model()
        user, created = User.objects.get_or_create(username="Abdullah")
        user.set_password(password)
        user.is_active = True
        user.is_staff = False
        user.is_superuser = False
        user.save()

        action = "created" if created else "updated"
        self.stdout.write(self.style.SUCCESS(f"Owner user Abdullah {action}."))
