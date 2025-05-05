from django.core.management.base import BaseCommand
from django.conf import settings
from github import Github
from landing.models.github_model import GithubRepo
import dateutil.parser

class Command(BaseCommand):
    help = "Descarga y sincroniza tus repositorios de GitHub en la base de datos."

    def handle(self, *args, **options):
        
        if not settings.GITHUB_TOKEN:
            self.stderr.write("❌ Define GITHUB_TOKEN en settings o en variables de entorno.")
            return

        gh = Github(settings.GITHUB_TOKEN)
        user = gh.get_user()
        repos = user.get_repos()
        count = 0

        for repo in repos:
            obj, created = GithubRepo.objects.update_or_create(
                repo_id=repo.id,
                defaults={
                    "name": repo.name,
                    "full_name": repo.full_name,
                    "description": repo.description or "",
                    "html_url": repo.html_url,
                    "clone_url": repo.clone_url,
                    "created_at": dateutil.parser.isoparse(repo.created_at.isoformat()),
                    "updated_at": dateutil.parser.isoparse(repo.updated_at.isoformat()),
                    "language": repo.language or "",
                    "stargazers": repo.stargazers_count,
                    "forks_count": repo.forks_count,
                    "private": repo.private,
                }
            )
            count += 1

        self.stdout.write(self.style.SUCCESS(f"✅ Sincronizados {count} repositorios."))
