from django.db import models

class FrasesModel(models.Model): 
    autor = models.CharField(max_length=255, null=False, blank=False)
    frase = models.TextField(null=False, blank=False)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Frase"
        verbose_name_plural = "Frase"
        ordering = ['-creado_en', 'autor']

    def __str__(self):
        return f"{self.autor} ({self.frase})"
