from django.contrib import admin
from landing.models.request_contact_model import RequestContactModel

# Register your models here.

@admin.register(RequestContactModel)
class RequestContactAdmin(admin.ModelAdmin):
    list_display = ("nombre", "email", "telefono", "motivo", "servicio", "creado_en")
    list_filter = ("servicio", "motivo", "creado_en")
    search_fields = ("nombre", "email", "telefono", "mensaje")
    readonly_fields = ("creado_en",)
    date_hierarchy = "creado_en"
    ordering = ("-creado_en",)

