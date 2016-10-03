import datetime

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
from .utils import get_start_of_week

DEFAULT_PASSWORD = "pbkdf2_sha256$24000$jtpxBo9B9F6R$GLt/P23jBvGiVJHeVOwFCMWOjF6ebqhkSev9QuRtigQ="

class UserSerializer(ModelSerializer):
    total_groups = SerializerMethodField()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'is_superuser', 'total_groups']

    def get_total_groups(self, obj):
        try:
            member = Member.objects.get(user=obj)
            return len(MemberGroup.objects.filter(member=member,
                                       member_type='Admin'))
        except Member.DoesNotExist:
            return 0

class OrganizationSerializer(ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'description', ]

class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'description']
 
    def create(self, validated_data):
        group = Group.objects.create(**validated_data)
        group.organization = self.context['request'].organization
        group.save()
        return group

class MemberGroupSerializer(ModelSerializer):
    member_id = IntegerField(source='member.id')
    group_id = IntegerField(source='group.id')

    class Meta:
        model = MemberGroup
        fields = ['id', 'member_id', 'group_id', 'member_type']
 
    def create(self, validated_data):
        print(validated_data)
        member_group = MemberGroup(member_type=validated_data['member_type'])
        member = Member.objects.get(pk=validated_data['member']['id'])
        member_group.member = member
        member_group.group = Group.objects.get(pk=validated_data['group']['id'])
        member_group.save()
        if validated_data['member_type'] == 'Admin' and not member.user:
            User.objects.create(first_name=member.first_name,
                                last_name=member.last_name,
                                email=member.email,
                                username=member.email,
                                password=DEFAULT_PASSWORD,
                                date_joined=datetime.datetime.now(),
                                is_superuser=False,
                                is_staff=False,
                                is_active=True)
        return member_group

class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description']
 
    def create(self, validated_data):
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
                  'email',
                  'other_name',
                  'gender',
                  'language',
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
        # print(validated_data)
        # print(self.context['request'])
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
        member = Member.objects.create(**validated_data)
        member.organization = self.context['request'].organization
        member.save()
        return member

class MemberSearchSerializer(ModelSerializer):
    year_of_birth = SerializerMethodField(read_only=True)
    home_group = SerializerMethodField()

    class Meta:
        model = Member
        fields = (
            'id',
            'first_name',
            'last_name',
            'gender',
            'home_phone',
            'year_of_birth',
            'home_group',
        )

    def get_home_group(self, obj):
        try:
            mg = MemberGroup.objects.get(member=obj, member_type='Member')
            return mg.group.name
        except MemberGroup.DoesNotExist:
            return ''

    def get_year_of_birth(self, obj):
        if obj.birth_date:
            return obj.birth_date.year
        return ""

class AttendanceSerializer(ModelSerializer):
    member_id = IntegerField(source='member.id')
    event_id = IntegerField(source='event.id')

    class Meta:
        model = EventAttendance
        fields = ['id', 'member_id', 'event_id', 'attended', 'date', 'absent_reason']
 
    def create(self, validated_data):
        print(validated_data)
        attendance = EventAttendance(attended=validated_data['attended'],
                                     absent_reason=validated_data['absent_reason'],
                                     date=get_start_of_week(validated_data['date']))
        attendance.member = Member.objects.get(pk=validated_data['member']['id'])
        attendance.event = Event.objects.get(pk=validated_data['event']['id'])
        attendance.save()
        return attendance

    def update(self, instance, validated_data):
        instance.attended = validated_data['attended']
        instance.absent_reason = validated_data['absent_reason']
        instance.save()
        return instance
