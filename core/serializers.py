from django.contrib.auth.models import User
from rest_framework.serializers import (ListSerializer,
                                        ModelSerializer,
                                        ListField,
                                        IntegerField,
                                        CharField,
                                        DateField,
                                        ReadOnlyField,
                                        SerializerMethodField)

from .models import MemberProfile, Address, Locality

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

class MemberProfileSerializer(ModelSerializer):
    id = IntegerField(source='user.pk', read_only=True)
    first_name = CharField(source='user.first_name')
    last_name = CharField(source='user.last_name')
    email = CharField(source='user.email')

    class Meta:
        model = MemberProfile
        fields = ['id',
                  'last_name',
                  'first_name',
                  'email',
                  'nick_name',
                 ]

    def update(self, instance, validated_data):
        user = instance.user
        user.first_name = validated_data['user']['first_name']
        user.last_name = validated_data['user']['last_name']
        user.email = validated_data['user']['email']
        user.save()
        return instance

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['user']['email'],
            password='password',
        )
        user.first_name = validated_data['user']['first_name']
        user.last_name = validated_data['user']['last_name']
        user.email = validated_data['user']['email']
        user.is_active = False
        user.save()

        profile, _ = MemberProfile.objects.get_or_create(user=user)
        
        return profile
