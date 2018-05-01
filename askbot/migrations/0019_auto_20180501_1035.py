# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('askbot', '0018_auto_20180430_1027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='invite',
            field=models.ForeignKey(related_name='actions', blank=True, to='askbot.Invite', null=True),
        ),
    ]
