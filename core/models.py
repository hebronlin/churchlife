from django.contrib.auth.models import User, Permission, Group
from django.db.models import (Model, CharField, PositiveIntegerField, DateField,
                              TextField, URLField, EmailField, BooleanField,
                              DateTimeField, OneToOneField, ForeignKey)
from django.db.models.signals import post_save
from django_countries.fields import Country, CountryField

import pytz

from .managers import MemberManager
from .consts import (LANGUAGE_CHOICES, STATUS_CHOICES, GENDER_CHOICES,
                     MEMBER_TYPE_CHOICES, ABSENT_REASON_CHOICES)

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
    name = CharField(max_length=100)
    description = CharField(max_length=500)
    address = ForeignKey(Address, blank=True, null=True)

    def __str__(self):
        return u'{}'.format(self.name)

class Group(BaseModel):
    """ Group definition """
    name = CharField(max_length=100)
    description = CharField(max_length=500)
    parent = ForeignKey(Group, blank=True, null=True)
    organization = ForeignKey(Organization, blank=True, null=True)

    def __str__(self):
        return u'{}'.format(self.name)

class Event(BaseModel):
    """ Event definition """
    name = CharField(max_length=100)
    description = CharField(max_length=500)

    def __str__(self):
        return u'{}'.format(self.name)

class Member(BaseModel):
    """ Member definition """
    # user = OneToOneField(User,
    #                      related_name='profile',
    #                      primary_key=True)
    last_name = CharField(max_length=30)
    first_name = CharField(max_length=30)
    middle_name = CharField(max_length=30, null=True, blank=True)
    email = CharField(max_length=254, null=True, blank=True)
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
    status = CharField(max_length=50, default='Others', choices=STATUS_CHOICES)

    def __str__(self):
        return u'{} {}'.format(self.first_name, self.last_name)
    # objects = MemberManager()

# # Make sure the profile is always created after a user is created.
# def user_post_save_receiver(sender, instance, created, **kwargs):
#     user = instance

#     if created:
#         MemberProfile.objects.get_or_create(user=user)

#     user.profile.save()

# post_save.connect(user_post_save_receiver, sender=User)

class MemberGroup(BaseModel):
    """ Member Group """
    member = ForeignKey(Member)
    group = ForeignKey(Group)
    member_type = CharField(max_length=50, default='Member', choices=MEMBER_TYPE_CHOICES)

    def __str__(self):
        return u'{} {}'.format(self.member, self.group)

class GroupAttendancee(BaseModel):
    """ Group Attendancee """
    date = DateField()
    group = ForeignKey(Group)
    event = ForeignKey(Event)
    completed = BooleanField(default=False)
    notes = TextField(blank=True, null=True)

class MemberAttendancee(BaseModel):
    """ Member Attendancee """
    date = DateField()
    member = ForeignKey(Member)
    event = ForeignKey(Event)
    reason = CharField(max_length=50, default='Unknown', choices=ABSENT_REASON_CHOICES)

class MemberNotes(BaseModel):
    """ Member Notes """
    member = ForeignKey(Member)
    notes = TextField()

