from django.contrib.auth.models import User
from rest_framework.serializers import (ListSerializer,
                                        ModelSerializer,
                                        HyperlinkedModelSerializer,
                                        ListField,
                                        IntegerField,
                                        CharField,
                                        DateField,
                                        ChoiceField,
                                        RelatedField,
                                        ReadOnlyField,
                                        SerializerMethodField)

from .consts import (LANGUAGE_CHOICES, MEMBER_STATUS_CHOICES, GENDER_CHOICES,
                     MEMBER_TYPE_CHOICES, ABSENT_REASON_CHOICES)
from .models import (Member, Group, Organization, Event, MemberGroup,
                     Address, EventNote, EventAttendance)

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

class OrganizationSerializer(ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'description', ]

class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'organization']
 
    def create(self, validated_data):
        print(validated_data)
        group = Group.objects.create(**validated_data)
        group.organization = self.context['request'].organization
        group.save()
        return group

class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'organization']
 
    def create(self, validated_data):
        print(validated_data)
        event = Event.objects.create(**validated_data)
        event.organization = self.context['request'].organization
        event.save()
        return event

# class MemberSerializer(HyperlinkedModelSerializer):
class MemberSerializer(ModelSerializer):
    # organization = OrganizationSerializer()
    locality = ReadOnlyField(source='organization.name')
    gender = ChoiceField(choices=GENDER_CHOICES, default='M')
    home_group = SerializerMethodField()
    # groups = RelatedField(many=True, read_only=True)

    class Meta:
        model = Member
        fields = ['id',
                  'last_name',
                  'first_name',
                  'language',
                  'other_name',
                  'gender',
                  'email',
                  'locality',
                  'home_group',
                 ]

    def get_home_group(self, obj):
        try:
            mg = MemberGroup.objects.get(member=obj, member_type='Member')
            return mg.group.name
        except MemberGroup.DoesNotExist:
            return ''

    def update(self, instance, validated_data):
        print(validated_data)
        print(self.context['request'])
        if instance.user:
            user = instance.user
            user.first_name = validated_data['first_name']
            user.last_name = validated_data['last_name']
            user.email = validated_data['email']
            user.save()
        Member.objects.filter(pk=instance.pk).update(**validated_data)
        instance = Member.objects.get(pk=instance.pk)
        return instance
 
    def create(self, validated_data):
        print(validated_data)
        member = Member.objects.create(**validated_data)
        member.organization = self.context['request'].organization
        member.save()
        return member

class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'organization']

class AttendanceSerializer(ModelSerializer):
    member_id = ReadOnlyField(source='member.id')
    event_id = ReadOnlyField(source='event.id')

    class Meta:
        model = EventAttendance
        fields = ['id', 'member_id', 'event_id', 'attended', 'date', 'absent_reason']
