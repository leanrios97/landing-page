import re
from rest_framework import serializers
from landing.models.request_contact_model import RequestContactModel

class RequestContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestContactModel
        fields = "__all__"

    def validate_telefono(self, value):
        if value and not re.match(r'^\+?\d{7,15}$', value):
            raise serializers.ValidationError(
                "El teléfono debe tener sólo dígitos (7-15) y opcional '+' al inicio."
            )
        return value

    def validate_latitud(self, value):
        if value is not None and not (-90 <= value <= 90):
            raise serializers.ValidationError("Latitud debe estar entre -90 y 90.")
        return value

    def validate_longitud(self, value):
        if value is not None and not (-180 <= value <= 180):
            raise serializers.ValidationError("Longitud debe estar entre -180 y 180.")
        return value

    def validate(self, attrs):
        if attrs.get("motivo") == "otro" and not attrs.get("mensaje"):
            raise serializers.ValidationError({
                "mensaje": 'Debe proporcionar un texto en "mensaje" para motivo "otro".'
            })
        return attrs
