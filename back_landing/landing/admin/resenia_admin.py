from django.contrib import admin
from landing.models.resenia_model import ReseniaModel

@admin.register(ReseniaModel)
class ReseniaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "posicion", "empresa", "servicio", "resenia", "creado_en", "calificacion","linkedin")
    list_filter = ("servicio", "creado_en", "calificacion")
    search_fields = ("nombre", "posicion", "empresa", "servicio", "resenia", "creado_en", "calificacion")
    readonly_fields = ("creado_en",)
    date_hierarchy = "creado_en"
    ordering = ("-creado_en",)