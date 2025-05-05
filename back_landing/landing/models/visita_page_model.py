from django.db import models

class PageVisit(models.Model):
    """
    Log de cada visita a la web.  
    Guarda solo datos de petición HTTP, considerados 'estrictamente necesarios'.
    """
    timestamp = models.DateTimeField(
        auto_now_add=True,
        help_text="Fecha y hora en que se recibió la petición"
    )
    ip_address = models.GenericIPAddressField(
        help_text="IP de quien hace la petición"
    )
    path = models.CharField(
        max_length=2000,
        help_text="Ruta solicitada (request.path)"
    )
    method = models.CharField(
        max_length=10,
        help_text="Método HTTP (GET, POST, …)"
    )
    status_code = models.PositiveSmallIntegerField(
        help_text="Código de respuesta HTTP"
    )
    user_agent = models.TextField(
        help_text="Encabezado User-Agent completo"
    )
    referer = models.URLField(
        blank=True, null=True,
        help_text="Página origen (Referer header), si existe"
    )
    accept_language = models.CharField(
        max_length=255, blank=True,
        help_text="Idiomas preferidos (Accept-Language header)"
    )
    response_time_ms = models.PositiveIntegerField(
        blank=True, null=True,
        help_text="Tiempo de respuesta en milisegundos (opcional)"
    )
    country = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="País aproximado (usando GeoIP, opcional)"
    )

    class Meta:
        ordering = ["-timestamp"]
        verbose_name = "Visita de página"
        verbose_name_plural = "Visitas de página"

    def __str__(self):
        return f"{self.ip_address} → {self.path} [{self.status_code}] at {self.timestamp}"
