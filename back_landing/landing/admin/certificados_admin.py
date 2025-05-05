from django.contrib import admin
from landing.models.certificados_model import CertificacionesModel

@admin.register(CertificacionesModel)
class CertificacionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'plataforma', 'año')
    list_filter  = ('plataforma', 'año')
    search_fields = ('nombre',)