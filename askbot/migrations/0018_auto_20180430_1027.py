# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('askbot', '0017_auto_20180430_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='link',
            field=models.CharField(max_length=1024),
        ),
    ]
