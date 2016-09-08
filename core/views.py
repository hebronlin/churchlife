from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q, Min, Max
from django.views.generic.base import View, TemplateView
from django.shortcuts import get_object_or_404
import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from churchlife.authentication.views import LoginRequiredMixIn, NoCacheMixIn
from .models import (Member, Group, EventAttendance,
                     EventNote, Event,
                     MemberGroup, Organization)
from .serializers import (UserSerializer, MemberSerializer,
                          MemberGroupSerializer, MemberSearchSerializer,
                          GroupSerializer, AttendanceSerializer,
                          OrganizationSerializer, EventSerializer)
from .utils import get_start_of_week

class BaseModelViewCreateUpdateMixin():
    """
    djangorestframework mixin
    """
    def create(self, request):
        data = request.data
        print("data: {}".format(data))
        # if "id" in data: data["id"] = 0
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid()
        print("Errors: {}".format(serializer.errors))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        data = request.data
        print("data: {}".format(data))
        instance = get_object_or_404(self.serializer_class.Meta.model, pk=pk)
        
        serializer = self.serializer_class(instance, data=request.data, context={'request': request})

        serializer.is_valid()
        print("Errors: {}".format(serializer.errors))

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#@login_required()
class IndexView(LoginRequiredMixIn, TemplateView):
    template_name = 'core/index.html'


class UserSessionView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    """Get the user object in the session"""
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.id)


class UserView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


class MemberView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = MemberSerializer

    def get_queryset(self):
        organization = self.request.organization
        group_id = None
        if 'gid' in self.request.GET and self.request.GET['gid']:
            try:
                group_id = self.request.GET['gid']
            except:
                pass
        # else:
        #     group_admin = Member.objects.get(user=self.request.user)
        print("group: {}".format(group_id))
        if group_id:
            return Member.objects.filter(id__in=[mg.member_id for mg
                        in MemberGroup.objects.filter(group_id=group_id)])
        # elif organization:
        #     return Member.objects.filter(organization=organization)
        # else:
        #     return Member.objects.all()
        return None


class MemberSearchView(ModelViewSet):
    serializer_class = MemberSearchSerializer

    def get_queryset(self):
        org = Q(organization=self.request.organization)
        print(org)

        if 'name' in self.request.GET:
            q = (
                  Q(first_name__icontains=self.request.GET['name']) |
                  Q(last_name__icontains=self.request.GET['name'])
                ) & org
        else:
            q = org

        return Member.objects.filter(
            q
        )


class OrganizationView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = OrganizationSerializer

    def get_queryset(self):
        return Organization.objects.all()


class GroupView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = GroupSerializer

    def get_queryset(self):
        organization = self.request.organization
        if organization:
            return Group.objects.filter(organization=organization)
        else:
            return Group.objects.all()


class MemberGroupView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = MemberGroupSerializer

    def get_queryset(self):
        return MemberGroup.objects.all()


class AttendanceView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        group_admin = Member.objects.get(user=self.request.user)
        if 'day' in self.request.GET and self.request.GET['day']:
            day = datetime.datetime.strptime(self.request.GET['day'], 
                                                "%Y-%m-%d").date()
        else:
            day = get_start_of_week(datetime.date.today())
        if 'gid' in self.request.GET and self.request.GET['gid']:
            try:
                group = Group.objects.get(pk=int(self.request.GET['gid']))
            except:
                return None
        else:
            mgs = MemberGroup.objects.filter(member=group_admin,
                                                member_type='Admin')
            if mgs:
                group = mgs[0].group
            else:
                return None
        return EventAttendance.objects.filter(member__in=
                [mg.member for mg in MemberGroup.objects.filter(
                    group=group)], date=day)


class EventView(BaseModelViewCreateUpdateMixin, ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        organization = self.request.organization
        if organization:
            return Event.objects.filter(organization=organization)
        else:
            return Event.objects.all()

