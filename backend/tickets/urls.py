from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, register

router = DefaultRouter()
router.register(
    "tickets",
    TicketViewSet,
    basename="ticket"
)

urlpatterns = [
    path("register/", register),
]

urlpatterns += router.urls