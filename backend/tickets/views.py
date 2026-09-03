from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Ticket, User, TicketHistory
from .serializers import TicketSerializer,UserSerializer, RegisterSerializer, UserListSerializer, TicketHistorySerializer
from django.db import models
from django.db.models import Count
from django.shortcuts import get_object_or_404

class TicketListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        tickets = Ticket.objects.all()
        
        assigned_to_me = request.query_params.get('assigned_to_me')
        if assigned_to_me == 'true':
            tickets = tickets.filter(assigned_to=request.user)
            
        status_param = request.query_params.get('status')
        if status_param:
            tickets = tickets.filter(status=status_param)
            
        category_param = request.query_params.get('category')
        if category_param:
            tickets = tickets.filter(category=category_param)

        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):

        serializer = TicketSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(assigned_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TicketDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Ticket, pk=pk)

    def get(self, request, pk):
        """Retrieve a single ticket by ID"""
        ticket = self.get_object(pk)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data)

    def put(self, request, pk):
        ticket = self.get_object(pk)

        old_values = {
            'status': ticket.status,
            'priority': ticket.priority,
            'assigned_to': ticket.assigned_to.username if ticket.assigned_to else None,
            'resolution_note': ticket.resolution_note,
        }

        serializer = TicketSerializer(ticket, data=request.data, partial=True)

        if serializer.is_valid():
            updated_ticket = serializer.save()

            new_values = {
                'status': updated_ticket.status,
                'priority': updated_ticket.priority,
                'assigned_to': updated_ticket.assigned_to.username if updated_ticket.assigned_to else None,
                'resolution_note': updated_ticket.resolution_note,
            }

            for field_name, old_value in old_values.items():
                new_value = new_values[field_name]
                if old_value != new_value:
                    TicketHistory.objects.create(
                        ticket=updated_ticket,
                        changed_by=request.user,
                        field_changed=field_name,
                        old_value=old_value,
                        new_value=new_value,
                    )

            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user.role != 'manager':
            return Response(
                {"error": "Only managers can delete tickets."}, 
                status=status.HTTP_403_FORBIDDEN
            )
            
        ticket = self.get_object(pk)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TicketHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        ticket = get_object_or_404(Ticket, pk=pk)
        history = ticket.history.all()
        serializer = TicketHistorySerializer(history, many=True)
        return Response(serializer.data)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if request.user.role != 'manager':
            return Response(
                {"error": "Only managers can view the user list."}, 
                status=status.HTTP_403_FORBIDDEN
            )   
        engineers = User.objects.filter(role='engineer')
        serializer = UserListSerializer(engineers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class TicketStatsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        tickets = Ticket.objects.all()
        
        if request.user.role == 'engineer':
            tickets = tickets.filter(assigned_to=request.user)

        stats = tickets.aggregate(
            total=Count('id'),
            closed_count=Count('id',filter=models.Q(status='closed')),
            open_count=Count('id', filter=models.Q(status='open')),
            in_progress_count=Count('id', filter=models.Q(status='in_progress')),
            resolved_count=Count('id', filter=models.Q(status='resolved'))
        )
        
        return Response(stats)