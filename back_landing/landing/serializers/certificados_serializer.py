from rest_framework import serializers
from landing.models.certificados_model import CertificacionesModel 

class CertificacionSerializer(serializers.ModelSerializer):
    año = serializers.IntegerField()
    link = serializers.URLField(source='certificado')

    class Meta:
        model = CertificacionesModel
        fields = (
            'id',         
            'nombre',     
            'plataforma', 
            'descripcion',
            'año',       
            'link',       
        )
