import re 
from rest_framework import serializers
from landing.models.resenia_model import ReseniaModel, CALIFICACION_CHOICES, SERVICIO_CHOICES

class ReseniaSerializer(serializers.ModelSerializer):
    # Re-definimos los campos para ajustar validaciones extra si hace falta
    nombre = serializers.CharField(max_length=255)
    posicion = serializers.CharField(max_length=100)
    empresa = serializers.CharField(max_length=255)
    servicio = serializers.ChoiceField(choices=[c[0] for c in SERVICIO_CHOICES])
    calificacion = serializers.ChoiceField(
        choices=[c[0] for c in CALIFICACION_CHOICES],
        default=5
    )
    resenia = serializers.CharField(allow_blank=True, required=False)
    linkedin = serializers.URLField()

    class Meta:
        model = ReseniaModel
        # incluimos el id y el campo creado_en para que salgan en la respuesta
        fields = ['id', 'nombre', 'posicion', 'empresa', 'servicio', 'resenia', 'calificacion', 'creado_en', "linkedin"]
        read_only_fields = ['id', 'creado_en']

    def validate_calificacion(self, value):
        # aunque ChoiceField ya lo valida, aquí podrías añadir lógica extra
        if not (1 <= int(value) <= 5):
            raise serializers.ValidationError("La calificación debe estar entre 1 y 5")
        return value
    