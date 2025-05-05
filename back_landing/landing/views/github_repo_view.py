import logging
from rest_framework import generics, status
from rest_framework.response import Response
from landing.models.github_model import GithubRepo
from landing.serializers.github_repo_serializer import GithubRepoSerializer
from landing.permissions import HasClientSecret
from landing.core.pagination_core import GithubRepoLimitOffsetPagination

logger = logging.getLogger("landing")


class GithubRepoListApiView(generics.ListAPIView):
    """
    GET /api/github-repos/?limit=5&offset=10
    Devuelve repositorios paginados: el cliente determina 'limit' (cantidad)
    y 'offset' (desde qué índice).
    """
    queryset = GithubRepo.objects.all().order_by('-updated_at')
    serializer_class = GithubRepoSerializer
    permission_classes = [HasClientSecret]
    pagination_class = GithubRepoLimitOffsetPagination
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        logger.debug("Request GET /api/github-repos/ with params %s", request.query_params)

        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return Response({
                    "success": True,
                    "count":    self.paginator.count,
                    "next":     self.paginator.get_next_link(),
                    "previous": self.paginator.get_previous_link(),
                    "data":     serializer.data,
                }, status=status.HTTP_200_OK)

            # Sin paginar (no debería llegar aquí en ListAPIView)
            serializer = self.get_serializer(queryset, many=True)
            return Response({"success": True, "data": serializer.data},
                            status=status.HTTP_200_OK)

        except Exception as exc:
            logger.error("Error inesperado al listar repositorios GitHub", exc_info=exc)
            return Response(
                {
                    "success": False,
                    "message": "Ocurrió un error interno. Intente nuevamente más tarde."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )