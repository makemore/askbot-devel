# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('askbot', '0019_auto_20180501_1035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='state',
            field=models.IntegerField(default=0, choices=[(0, b'Todo'), (1, b'Done'), (2, b'Irrelevant')]),
        ),
    ]
