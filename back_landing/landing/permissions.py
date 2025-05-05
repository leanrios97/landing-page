from rest_framework.permissions import BasePermission
from django.conf import settings

class HasClientSecret(BasePermission):
    """
    Sólo deja pasar si hay un header Authorization: Bearer <secret>
    que coincida con settings.CLIENT_SECRET
    """
    def has_permission(self, request, view):

        auth = request.headers.get("Authorization", "")
        
        if not auth.startswith("Bearer "):
            return False
        token = auth.split("Bearer ")[1].strip()

        return bool(token and token == settings.CLIENT_SECRET)