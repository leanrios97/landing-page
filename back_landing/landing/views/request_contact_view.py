import logging
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from landing.models.request_contact_model import RequestContactModel
from landing.serializers.request_contact_serializer import RequestContactSerializer
from landing.permissions import HasClientSecret
from landing.services.envio_mail_contacto import ContactoEmailNotificacion

logger = logging.getLogger("landing")


class ContactCreateApiView(generics.CreateAPIView):
    queryset = RequestContactModel.objects.all()
    serializer_class = RequestContactSerializer
    permission_classes = [HasClientSecret]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        logger.debug("Request payload (parsed): %s", request.data)

        try:
            data = request.data.copy()
            ubic = data.get("ubicacion")
            if ubic:
                # Intentamos dividir en lat y lon
                parts = ubic.split(",", 1)
                if len(parts) != 2:
                    raise ValidationError({"ubicacion": ["Formato inválido. Debe ser 'latitud,longitud'."]})
                lat_str, lon_str = parts
                try:
                    data["latitud"]  = float(lat_str.strip())
                    data["longitud"] = float(lon_str.strip())
                except ValueError:
                    raise ValidationError({"ubicacion": ["Latitud y longitud deben ser números."]})

            # Serializar y validar
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            # Guardar y obtener instancia
            contact = serializer.save()

            # Enviar notificación interna por email (si falla, sólo lo logueamos)
            try:
                ContactoEmailNotificacion(contact).send()
                logger.info("Notificación interna enviada: %s", contact.email)
            except Exception as e:
                logger.error("Error al enviar email de notificación interna", exc_info=e)

            # Responder al cliente
            return Response(
                {"success": True, "data": serializer.data},
                status=status.HTTP_201_CREATED
            )

        except ValidationError as exc:
            logger.warning("ValidationError: %s", exc.detail)
            return Response(
                {"success": False, "errors": exc.detail},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as exc:
            logger.error("Error inesperado al crear Contacto", exc_info=exc)
            return Response(
                {
                    "success": False,
                    "message": "Ocurrió un error interno. Intente nuevamente más tarde."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )