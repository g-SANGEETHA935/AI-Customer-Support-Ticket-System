from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Ticket
from .serializers import TicketSerializer
from .ai import categorize_ticket

class TicketViewSet(viewsets.ModelViewSet):

    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Ticket.objects.filter(
            created_by=self.request.user
        )

    def perform_create(self, serializer):

        description = self.request.data.get(
            "description"
        )

        category, priority = categorize_ticket(
            description
        )

        serializer.save(
            created_by=self.request.user,
            category=category,
            priority=priority
        )