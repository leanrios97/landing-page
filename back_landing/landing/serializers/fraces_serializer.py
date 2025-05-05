from rest_framework import serializers
from landing.models.frases_model import FrasesModel

class FrasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrasesModel
        fields = '__all__'