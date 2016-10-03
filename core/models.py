from django.contrib.auth.models import User, Permission, Group
from django.db.models import (Model, CharField, PositiveIntegerField, DateField,
                              TextField, URLField, EmailField, BooleanField,
                              DateTimeField, OneToOneField, ForeignKey)
from django.db.models.signals import post_save
from django_countries.fields import Country, CountryField

import pytz

from .consts import (LANGUAGE_CHOICES, MEMBER_STATUS_CHOICES, GENDER_CHOICES,
                     MEMBER_TYPE_CHOICES, GROUP_TYPE_CHOICES, EVENT_STATUS_CHOICES,
                     EVENT_TYPE_CHOICES, ABSENT_REASON_CHOICES)
# from .managers import MemberManager

TIME_ZONES = [(tz, tz) for tz in pytz.common_timezones]

class BaseModel(Model):

    created = DateTimeField(auto_now_add=True,
                            help_text="The date when this record was created.")
    last_updated = DateTimeField(auto_now=True, editable=False,
                                help_text="The date when this record was last updated.")

    class Meta:
        abstract = True

    def update(self, **kwargs):
        fieldnames = [field.name for field in self._meta.fields]
        for attr, value in kwargs.iteritems():
            if attr in fieldnames and hasattr(self, attr):
                setattr(self, attr, value)
        self.save()

class Address(BaseModel):
    """ Address class definition """
    address1 = CharField(max_length=255)
    address2 = CharField(max_length=255, blank=True, null=True)
    city = CharField(max_length=255)
    state = CharField(max_length=255)
    zip_code = CharField(max_length=50)
    country = CountryField(null=True, blank=True)

    def __str__(self):
        return u'{}, {}, {}'.format(self.address1, self.city, self.state)

class Organization(BaseModel):
    """ Organization class definition """
    name = CharField(max_length=100, unique=True)
    description = CharField(max_length=500)
    address = ForeignKey(Address, blank=True, null=True)

    def __str__(self):
        return u'{} {}'.format(self.id, self.name)

class Group(BaseModel):
    """ Group definition """
    name = CharField(max_length=100)
    description = CharField(max_length=500)
    group_type = CharField(max_length=30, default='Small Group', choices=GROUP_TYPE_CHOICES)
    parent = ForeignKey(Group, blank=True, null=True)
    organization = ForeignKey(Organization, blank=True, null=True)

    def __str__(self):
        return u'{} {}'.format(self.id, self.name)

    class Meta:
        unique_together = ('name', 'organization')

class Event(BaseModel):
    """ Event definition """
    name = CharField(max_length=100)
    description = CharField(max_length=500)
    status = CharField(max_length=30, default='Active', choices=EVENT_STATUS_CHOICES)
    event_type = CharField(max_length=30, default='Weekly', choices=EVENT_TYPE_CHOICES)
    group = ForeignKey(Group, blank=True, null=True)
    organization = ForeignKey(Organization, blank=True, null=True)

    def __str__(self):
        return u'{} {}'.format(self.id, self.name)

    class Meta:
        unique_together = ('name', 'group', 'organization')

class Member(BaseModel):
    """ Member definition """
    user = OneToOneField(User, null=True, blank=True)
    last_name = CharField(max_length=30)
    first_name = CharField(max_length=30)
    middle_name = CharField(max_length=30, null=True, blank=True)
    email = CharField(max_length=254, unique=True, null=True, blank=True)
    nick_name = CharField(max_length=100, null=True, blank=True)
    other_name = CharField(max_length=100, null=True, blank=True)
    organization = ForeignKey(Organization, blank=True, null=True)
    gender = CharField(max_length=1, default='M', choices=GENDER_CHOICES)
    language = CharField(max_length=50, default='English', choices=LANGUAGE_CHOICES)
    deleted = BooleanField(default=False)
    timezone = CharField(max_length=50, choices=TIME_ZONES, default='UTC')
    locale = CharField(max_length=50, default="en_US")
    home_phone = CharField(max_length=50, blank=True, null=True)
    mobile_phone = CharField(max_length=50, blank=True, null=True)
    work_phone = CharField(max_length=50, blank=True, null=True)
    address = ForeignKey(Address, blank=True, null=True)
    birth_date = DateField(blank=True, null=True)
    baptism_date = DateField(blank=True, null=True)
    status = CharField(max_length=50, default='Others', choices=MEMBER_STATUS_CHOICES)

    # objects = MemberManager()

    def __str__(self):
        return u'{} {}'.format(self.first_name, self.last_name)

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

# Make sure a member is always created for a user.
def user_post_save_receiver(sender, instance, created, **kwargs):
    user = instance
    try:
        member = Member.objects.get(user=user)
    except Member.DoesNotExist:
        try:
            member = Member.objects.get(email=user.email)
            member.user = user
        except Member.DoesNotExist:
            member = Member(user=user)
    print(member)
    if user.first_name:
        member.first_name = user.first_name
    if user.last_name:
        member.last_name = user.last_name
    if user.email:
        member.email = user.email
    member.save()

post_save.connect(user_post_save_receiver, sender=User)

class MemberGroup(BaseModel):
    """ Member Group """
    member = ForeignKey(Member)
    group = ForeignKey(Group)
    member_type = CharField(max_length=50, default='Member', choices=MEMBER_TYPE_CHOICES)

    def __str__(self):
        return u'{} {} {}'.format(self.member, self.group, self.member_type)

    class Meta:
        unique_together = ('member', 'group', 'member_type')

class EventNote(BaseModel):
    """ Event Note """
    event = ForeignKey(Event)
    date = DateField()
    note = TextField()

    class Meta:
        unique_together = ('date', 'event')

class EventAttendance(BaseModel):
    """ Event Attendance """
    event = ForeignKey(Event)
    date = DateField()
    member = ForeignKey(Member)
    attended = BooleanField(default=False)
    absent_reason = CharField(max_length=50, default='Unknown', choices=ABSENT_REASON_CHOICES)

    class Meta:
        unique_together = ('date', 'member', 'event')

class MemberNote(BaseModel):
    """ Member Note """
    member = ForeignKey(Member)
    note = TextField()

