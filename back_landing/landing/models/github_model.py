from django.db import models

class GithubRepo(models.Model):
    repo_id      = models.BigIntegerField(unique=True)
    name         = models.CharField(max_length=200)
    full_name    = models.CharField(max_length=200)
    description  = models.TextField(blank=True, null=True)
    html_url     = models.URLField()
    clone_url    = models.URLField()
    created_at   = models.DateTimeField()
    updated_at   = models.DateTimeField()
    language     = models.CharField(max_length=100, blank=True, null=True)
    stargazers   = models.IntegerField()
    forks_count  = models.IntegerField()
    private      = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name