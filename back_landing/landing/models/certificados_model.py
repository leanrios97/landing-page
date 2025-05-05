from django.db import models

class CertificacionesModel(models.Model):
    PLATFORM_CHOICES = [
    ('coursera', 'Coursera'),
    ('udemy', 'Udemy'),
    ('datacamp', 'DataCamp'),
    ('platzi', 'Platzi'), 
    ('linkedin', 'Linkedin')
    ]

    nombre       = models.CharField("Título", max_length=255)
    plataforma   = models.CharField("Plataforma", max_length=50, choices=PLATFORM_CHOICES)
    descripcion  = models.CharField("Descripción", max_length=255, blank=True)
    año          = models.PositiveSmallIntegerField("Año")
    certificado  = models.URLField("Enlace al certificado")

    class Meta:
        verbose_name = "Certificación"
        verbose_name_plural = "Certificaciones"
        ordering = ['-año', 'nombre']

    def __str__(self):
        return f"{self.nombre} ({self.año})"