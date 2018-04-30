# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('askbot', '0016_action_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='user',
            field=models.ForeignKey(related_name='actions', blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
