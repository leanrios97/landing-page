import logging
from rest_framework import generics, status
from rest_framework.response import Response

from landing.models.certificados_model import CertificacionesModel
from landing.serializers.certificados_serializer import CertificacionSerializer
from landing.permissions import HasClientSecret

logger = logging.getLogger("landing")

class CertificacionListApiView(generics.ListAPIView):
    """
    GET /api/certificaciones/
    Devuelve todas las certificaciones. Requiere token (HasClientSecret).
    """
    queryset = CertificacionesModel.objects.all().order_by('-año')
    serializer_class = CertificacionSerializer
    permission_classes = [HasClientSecret]
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        logger.debug("Request GET /api/certificaciones/ params: %s", request.query_params)
        try:
            qs = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(qs, many=True)
            return Response(
                {
                    "success": True,
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )
        except Exception as exc:
            logger.error("Error inesperado al listar certificaciones", exc_info=exc)
            return Response(
                {
                    "success": False,
                    "message": "Ocurrió un error interno. Intente nuevamente más tarde."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
