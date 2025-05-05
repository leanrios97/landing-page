from rest_framework import serializers
from landing.models.visita_page_model import PageVisit

class PageVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageVisit
        fields = '__all__'
        read_only_fields = ('id', 'timestamp', 'country')