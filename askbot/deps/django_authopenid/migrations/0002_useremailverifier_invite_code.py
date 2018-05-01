# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_authopenid', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useremailverifier',
            name='invite_code',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
