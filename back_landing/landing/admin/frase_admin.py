from django.contrib import admin
from landing.models.frases_model import FrasesModel


@admin.register(FrasesModel)
class FraseAdmin(admin.ModelAdmin):
    list_display = ("autor", "frase", "creado_en")
    list_filter = ("autor", "creado_en",)
    search_fields = ("autor",)
    readonly_fields = ("creado_en",)
    date_hierarchy = "creado_en"
    ordering = ("-creado_en",)