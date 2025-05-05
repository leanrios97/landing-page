# logging/admin.py
from django.contrib import admin
from landing.models.visita_page_model import PageVisit

@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = (
        'timestamp',
        'ip_address',
        'path',
        'method',
        'status_code',
        'country',
    )
    list_filter = (
        'method',
        'status_code',
        'country',
    )
    search_fields = (
        'ip_address',
        'path',
        'user_agent',
    )
