from django.contrib.auth.models import User
from rest_framework.serializers import (ListSerializer,
                                        ModelSerializer,
                                        ListField,
                                        IntegerField,
                                        CharField,
                                        DateField,
                                        ReadOnlyField,
                                        SerializerMethodField)

from .models import Member, Address, Organization, Event

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', ]

    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            username = validated_data['username'],
            password = validated_data['password'],
        )
        return user

class MemberSerializer(ModelSerializer):
    locality = CharField(source='organization.name')

    class Meta:
        model = Member
        fields = ['id',
                  'last_name',
                  'first_name',
                  'email',
                  'gender',
                  'nick_name',
                  'other_name',
                  'locality',
                 ]

class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', ]
