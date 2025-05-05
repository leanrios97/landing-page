from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from .email_envio_abstracto import EmailSendAbstract
from rest_framework.response import Response

class ReseniaEmailNotificacion(EmailSendAbstract): 
    """
    Envía un mail de notificación cuando llega una nueva reseña.
    Recibe la instancia de RequestContactModel (o un dict validado).
    """
    def __init__(self, contact): 
        self.contact = contact

    def send(self):
        subject = "Nueva reseña ingresada"
        # Usamos un triple-quoted string para mayor legibilidad
        message = (
            f"Hola Lean,\n\n"
            f"Se a generado nueva reseña:\n\n"
            f"Nombre:   {self.contact.nombre}\n"
            f"empresa:    {self.contact.empresa}\n"
            f"servicio:   {self.contact.servicio}\n"
            f"calificacion: {self.contact.calificacion}\n"
            f"resenia:  {self.contact.resenia or '(sin mensaje)'}\n"
        )

        from_email    = settings.DEFAULT_FROM_EMAIL
        recipient_list = [
            "rios.leandro.data@gmail.com",
            "lean.rios1997@gmail.com",
        ]

        # send_mail lanza excepción si falla (fail_silently=False)
        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        return True

