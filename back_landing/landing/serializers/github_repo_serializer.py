from rest_framework import serializers
from landing.models.github_model import GithubRepo

class GithubRepoSerializer(serializers.ModelSerializer):
    # mapeamos updated_at a un campo con formato d/m/Y
    updated = serializers.DateTimeField(source='updated_at', format='%d/%m/%Y')
    # renombramos html_url para que en JSON salga como code_url
    code_url = serializers.URLField(source='html_url')
    # si tuvieras un campo homepage en el modelo, podrías exponerlo aquí:
    technology = serializers.CharField(source='language')

    class Meta:
        model = GithubRepo
        fields = (
            'repo_id',      # o elimínalo si no lo necesitas en la UI
            'name',         # aparece como título: “snake RL”
            'description',  # subtítulo: la descripción del proyecto
            'technology',   # etiqueta: “Python”
            'updated',      # “Actualizado: 26/9/2024”
            'code_url',     # para el botón “Código”
        )

    def get_demo_url(self, obj):
        # si añadiste homepage al modelo, úsalo:
        return getattr(obj, 'homepage', None)
