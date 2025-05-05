from django.contrib import admin
from landing.models.github_model import GithubRepo 

@admin.register(GithubRepo)
class GitHubAdmin(admin.ModelAdmin):
    # Campos que se mostrarán en la lista de registros
    list_display = (
        "repo_id",
        "name",
        "language",
        "stargazers",
        "forks_count",
        "private",
        "created_at",
        "updated_at",
    )
    # Campos por los que se podrá buscar
    search_fields = (
        "name",
        "full_name",
        "description",
    )
    # Filtros laterales
    list_filter = (
        "private",
        "language",
    )
    # Navegación por fecha de creación
    date_hierarchy = "created_at"
    # Orden por defecto
    ordering = ("-created_at",)
    # Campos de solo lectura en el formulario de detalle
    readonly_fields = (
        "repo_id",
        "created_at",
        "updated_at",
    )
