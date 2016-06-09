from django.contrib.auth.models import User, Permission, Group
from django.db.models import (Model, CharField, PositiveIntegerField, DateField,
                              TextField, URLField, EmailField, BooleanField,
                              OneToOneField, ForeignKey)
from django.db.models.signals import post_save
from django_countries.fields import Country, CountryField

import pytz

from .managers import MemberManager

TIME_ZONES = [(tz, tz) for tz in pytz.common_timezones]

class Address(Model):
    """ Address class definition """
    address1 = CharField(max_length=255)
    address2 = CharField(max_length=255, blank=True, null=True)
    city = CharField(max_length=255)
    state = CharField(max_length=255)
    zip_code = CharField(max_length=50)
    country = CountryField(null=True, blank=True)

class Locality(Model):
    """ Locality of the church """
    city = CharField(max_length=255)
    address = ForeignKey(Address, blank=True, null=True)

class MemberProfile(Model):
    """ Member profile definition """
    user = OneToOneField(User,
                         related_name='profile',
                         primary_key=True)
    locality = ForeignKey(Locality, blank=True, null=True)
    middle_name = CharField(max_length=30, null=True, blank=True)
    nick_name = CharField(max_length=100, null=True, blank=True)
    deleted = BooleanField(default=False)
    timezone = CharField(max_length=50,
                                choices=TIME_ZONES,
                                default='UTC')
    locale = CharField(max_length=50, default="en_US")
    phone = CharField(max_length=50, blank=True, null=True)

    objects = MemberManager()

# Make sure the profile is always created after a user is created.
def user_post_save_receiver(sender, instance, created, **kwargs):
    user = instance

    if created:
        MemberProfile.objects.get_or_create(user=user)

    user.profile.save()

post_save.connect(user_post_save_receiver, sender=User)
	