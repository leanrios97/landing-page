# landing/views/resenia_view.py

import logging
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from landing.models.resenia_model import ReseniaModel
from landing.serializers.resenia_serializer import ReseniaSerializer
from landing.services.envio_mail_resenia import ReseniaEmailNotificacion
from landing.core.pagination_core import GithubRepoLimitOffsetPagination  

logger = logging.getLogger("landing")


class ReseniaListCreateApiView(generics.ListCreateAPIView):
    """
    GET  /api/resenias/?limit=10&offset=0  -> lista reseñas paginadas
    POST /api/resenias/                 -> crea una nueva reseña
    """
    queryset = ReseniaModel.objects.all().order_by('-creado_en')
    serializer_class = ReseniaSerializer
    http_method_names = ['get', 'post']
    pagination_class = GithubRepoLimitOffsetPagination

    def list(self, request, *args, **kwargs):
        logger.debug("Listando todas las reseñas con paginación %s", request.query_params)
        try:
            qs = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(qs)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return Response({
                    "success": True,
                    "count":    self.paginator.count,
                    "next":     self.paginator.get_next_link(),
                    "previous": self.paginator.get_previous_link(),
                    "data":     serializer.data,
                }, status=status.HTTP_200_OK)

            # fallback si no hay paginación activa
            serializer = self.get_serializer(qs, many=True)
            return Response({"success": True, "data": serializer.data})

        except Exception as exc:
            logger.error("Error al listar reseñas", exc_info=exc)
            return Response(
                {"success": False, "message": "No se pudieron recuperar las reseñas."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        logger.debug("Payload de creación de reseña: %s", request.data)
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            contact = serializer.save()

            try: 
                ReseniaEmailNotificacion(contact).send()
                logger.info(f"Notificación interna enviada: {contact.nombre} {contact.empresa}")
            except Exception as e:
                logger.error("Error al enviar email de notificación interna", exc_info=e)

            logger.info(
                "Reseña creada: %s (%s) - calificación %s",
                serializer.data["nombre"],
                serializer.data["empresa"],
                serializer.data["calificacion"],
            )
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)

        except ValidationError as exc:
            logger.warning("ValidationError al crear reseña: %s", exc.detail)
            return Response({"success": False, "errors": exc.detail}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as exc:
            logger.error("Error inesperado al crear reseña", exc_info=exc)
            return Response(
                {"success": False, "message": "Ocurrió un error interno."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
