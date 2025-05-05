from django.db import models

SERVICIO_CHOICES = [
    ("automatizacion", "Automatizaciones"),
    ("ciencia",       "Ciencia de Datos"),
    ("backend",       "Desarrollo Backend"),
    ("analisis",      "Análisis de Datos"),
    ("ingenieria",    "Ingeniería de Datos"),
    ("trabajo",      "Trabajamos juntos"),
]

CALIFICACION_CHOICES = [
    (1, "★☆☆☆☆"),
    (2, "★★☆☆☆"),
    (3, "★★★☆☆"),
    (4, "★★★★☆"),
    (5, "★★★★★"),
]

class ReseniaModel(models.Model):
    nombre = models.CharField(max_length=255)
    posicion = models.CharField(max_length=100)
    empresa = models.CharField(max_length=255)
    servicio = models.CharField(max_length=20, choices=SERVICIO_CHOICES)
    resenia = models.TextField(blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    calificacion = models.PositiveSmallIntegerField(choices=CALIFICACION_CHOICES,default=5)
    linkedin = models.URLField(max_length=255, blank=True, null=True)

    class Meta: 
        verbose_name = "Reseña"
        verbose_name_plural = "Reseña"
        ordering = ["-creado_en"]
    
    def __str__(self):
        return f"{self.nombre} - {self.get_servicio_display()}"
