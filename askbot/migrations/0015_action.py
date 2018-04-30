# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('askbot', '0014_invite'),
    ]

    operations = [
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('state', models.IntegerField(default=0, choices=[(0, b'Unviewed'), (1, b'Viewed')])),
                ('text', models.CharField(max_length=1024)),
                ('link', models.URLField()),
                ('invite', models.ForeignKey(blank=True, to='askbot.Invite', null=True)),
            ],
        ),
    ]
