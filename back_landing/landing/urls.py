from django.urls import path
from landing.views.resenia_view import ReseniaListCreateApiView
from landing.views.request_contact_view import ContactCreateApiView
from landing.views.github_repo_view import GithubRepoListApiView
from landing.views.certificados_view import CertificacionListApiView
from landing.views.frases_view import FrasesListApiView
from landing.views.visita_page_view import PageVisitCreateApiView

urlpatterns = [
    path('contacto/', ContactCreateApiView.as_view(), name='crear-contacto'),
    path('resenias/', ReseniaListCreateApiView.as_view(), name='resenia-list'),
    path('github-repos/', GithubRepoListApiView.as_view(), name='github-repo-list'),
    path('certificaciones/', CertificacionListApiView.as_view(), name='certificaciones-list'),
    path('frases/', FrasesListApiView.as_view(), name='frases-list'),
    path('page-visits/', PageVisitCreateApiView.as_view(), name='page-visit-create'),
]