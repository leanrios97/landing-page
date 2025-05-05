# logging/views.py
import logging
from rest_framework import generics, status, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from landing.models.visita_page_model import PageVisit
from landing.serializers.visita_page_serializer import PageVisitSerializer

logger = logging.getLogger("logging")

class PageVisitCreateApiView(generics.CreateAPIView):
    """
    POST /api/page-visits/  -> registra una visita
    """
    queryset = PageVisit.objects.all()
    serializer_class = PageVisitSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        logger.debug("Registrando visita: %s", request.get_full_path())
        try:
            # Armamos los datos desde request.META
            data = {
                "ip_address":       request.META.get("REMOTE_ADDR"),
                "path":             request.get_full_path(),
                "method":           request.method,
                # Como es creación, asumimos HTTP 201
                "status_code":      status.HTTP_201_CREATED,
                "user_agent":       request.META.get("HTTP_USER_AGENT", "")[:1000],
                "referer":          request.META.get("HTTP_REFERER", ""),
                "accept_language":  request.META.get("HTTP_ACCEPT_LANGUAGE", ""),
            }

            # Serializar y validar
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            # Guardar el registro de visita
            visit = serializer.save()
            logger.info("Visita guardada: %s → %s", visit.ip_address, visit.path)

            return Response(
                {"success": True, "data": serializer.data},
                status=status.HTTP_201_CREATED
            )

        except ValidationError as exc:
            logger.warning("ValidationError al guardar visita: %s", exc.detail)
            return Response(
                {"success": False, "errors": exc.detail},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as exc:
            logger.error("Error inesperado al registrar visita", exc_info=exc)
            return Response(
                {"success": False, "message": "Error interno al guardar visita."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
