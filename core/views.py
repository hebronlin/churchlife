from django.contrib.auth.decorators import login_required
from django.views.generic.base import View, TemplateView
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from churchlife.authentication.views import LoginRequiredMixIn, NoCacheMixIn
from .models import Member, Event
from .serializers import UserSerializer, MemberSerializer, EventSerializer

class BaseModelViewCreateUpdateMixin():
    """
    djangorestframework mixin
    """
    def create(self, request):
        # data = request.data
        # if "id" in data: data["id"] = 0
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        instance = get_object_or_404(self.serializer_class.Meta.model, pk=pk)
        
        serializer = self.serializer_class(instance, data=request.data, context={'request': request})

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if serializer.is_valid():
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#@login_required()
class IndexView(LoginRequiredMixIn, TemplateView):
    template_name = 'core/index.html'


class MemberView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = MemberSerializer

    def get_queryset(self):
        return Member.objects.all()


class EventView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.all()

