# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-08-19 19:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='group_type',
            field=models.CharField(choices=[('Home Group', 'Home Group'), ('Attendance Group', 'Attendance Group'), ('Report Group', 'Report Group')], default='Home Group', max_length=30),
        ),
    ]
