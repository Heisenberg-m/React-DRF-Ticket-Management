from django.urls import path
from .views import (
    TicketListCreateView,
    RegisterView,
    CurrentUserView,
    TicketStatsView,
    TicketDetailView,
    UserListView,
    TicketHistoryView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/me/', CurrentUserView.as_view(), name='current-user'),
    path("users/", UserListView.as_view(), name="user-list"),
    
    path('tickets/stats/', TicketStatsView.as_view(), name='ticket-stats'),
    
    path('tickets/', TicketListCreateView.as_view(), name='ticket-list-create'),
    path('tickets/<int:pk>/', TicketDetailView.as_view(), name='ticket-detail'),
    path('tickets/<int:pk>/history/', TicketHistoryView.as_view(), name='ticket-history'),
]