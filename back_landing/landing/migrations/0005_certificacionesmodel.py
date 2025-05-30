# Generated by Django 5.1.4 on 2025-04-29 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0004_reseniamodel_linkedin_alter_reseniamodel_servicio"),
    ]

    operations = [
        migrations.CreateModel(
            name="CertificacionesModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=255, verbose_name="Título")),
                (
                    "plataforma",
                    models.CharField(
                        choices=[
                            ("coursera", "Coursera"),
                            ("udemy", "Udemy"),
                            ("datacamp", "DataCamp"),
                            ("platzi", "Platzi"),
                            ("linkedin", "Linkedin"),
                        ],
                        max_length=50,
                        verbose_name="Plataforma",
                    ),
                ),
                (
                    "descripcion",
                    models.CharField(
                        blank=True, max_length=255, verbose_name="Descripción"
                    ),
                ),
                ("año", models.PositiveSmallIntegerField(verbose_name="Año")),
                ("certificado", models.URLField(verbose_name="Enlace al certificado")),
            ],
            options={
                "verbose_name": "Certificación",
                "verbose_name_plural": "Certificaciones",
                "ordering": ["-año", "nombre"],
            },
        ),
    ]
