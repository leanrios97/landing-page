import logging
from rest_framework import generics, status
from rest_framework.response import Response

from landing.models.frases_model import FrasesModel
from landing.serializers.fraces_serializer import FrasesSerializer
from landing.permissions import HasClientSecret

logger = logging.getLogger("landing")

class FrasesListApiView(generics.ListAPIView):
    """
    GET /api/frases/ 
    Devuelve todas las Frases. Requiere token(HasClientSecret)
    """

    queryset = FrasesModel.objects.all().order_by('-creado_en')
    serializer_class = FrasesSerializer
    permission_classes = [HasClientSecret]
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        logger.debug("Request GET /api/frases/ params: %s", request.query_params)

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