from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from .email_envio_abstracto import EmailSendAbstract
from rest_framework.response import Response

class ContactoEmailNotificacion(EmailSendAbstract): 
    """
    Envía un mail de notificación cuando llega un nuevo contacto.
    Recibe la instancia de RequestContactModel (o un dict validado).
    """
    def __init__(self, contact): 
        self.contact = contact

    def send(self):
        subject = "Solicitud de contacto"
        # Usamos un triple-quoted string para mayor legibilidad
        message = (
            f"Hola Lean,\n\n"
            f"Se solicitó contacto del siguiente usuario:\n\n"
            f"Nombre:   {self.contact.nombre}\n"
            f"Email:    {self.contact.email}\n"
            f"Motivo:   {self.contact.motivo}\n"
            f"Servicio: {self.contact.servicio}\n"
            f"Mensaje:  {self.contact.mensaje or '(sin mensaje)'}\n"
        )
        # Si tienes lat/lon opcionales
        if getattr(self.contact, "latitud", None) is not None:
            message += f"Ubicación: {self.contact.latitud}, {self.contact.longitud}\n"

        from_email    = settings.DEFAULT_FROM_EMAIL
        recipient_list = [
            "rios.leandro.data@gmail.com",
            "lean.rios1997@gmail.com",
        ]

        # send_mail lanza excepción si falla (fail_silently=False)
        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        return True

