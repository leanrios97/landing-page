from django.db import models

SERVICIO_CHOICES = [
    ("automatizacion", "Automatizaciones"),
    ("ciencia",       "Ciencia de Datos"),
    ("backend",       "Desarrollo Backend"),
    ("analisis",      "Análisis de Datos"),
    ("ingenieria",    "Ingeniería de Datos"),
]

MOTIVO_CHOICES = [
    ("consulta",      "Consulta general"),
    ("presupuesto",   "Solicitud de presupuesto"),
    ("colaboracion",  "Propuesta de colaboración"),
    ("laboral",       "Oportunidad laboral"),
    ("otro",          "Otro motivo"),
]


class RequestContactModel(models.Model):
    nombre = models.CharField(max_length=255)
    email = models.EmailField()
    telefono = models.CharField(max_length=30, blank=True)
    motivo = models.CharField(max_length=20, choices=MOTIVO_CHOICES)
    servicio = models.CharField(max_length=20, choices=SERVICIO_CHOICES)
    mensaje = models.TextField(blank=True)
    latitud = models.FloatField(null=True, blank=True)
    longitud = models.FloatField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta: 
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"
        ordering = ["-creado_en"]

    def __str__(self):
        return f"{self.nombre} - {self.get_servicio_display()}"
