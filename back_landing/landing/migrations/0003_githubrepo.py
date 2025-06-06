# Generated by Django 5.1.4 on 2025-04-28 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0002_reseniamodel"),
    ]

    operations = [
        migrations.CreateModel(
            name="GithubRepo",
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
                ("repo_id", models.BigIntegerField(unique=True)),
                ("name", models.CharField(max_length=200)),
                ("full_name", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True, null=True)),
                ("html_url", models.URLField()),
                ("clone_url", models.URLField()),
                ("created_at", models.DateTimeField()),
                ("updated_at", models.DateTimeField()),
                ("language", models.CharField(blank=True, max_length=100, null=True)),
                ("stargazers", models.IntegerField()),
                ("forks_count", models.IntegerField()),
                ("private", models.BooleanField(default=False)),
            ],
        ),
    ]
