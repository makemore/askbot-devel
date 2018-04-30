from django.db import models
from askbot.models.invites import Invite
from django.contrib.auth.models import User

class Action(models.Model):
    UNVIEWED = 0
    VIEWED = 1

    STATE_CHOICES = (
        (UNVIEWED, 'Unviewed'),
        (VIEWED, 'Viewed'),
    )

    state = models.IntegerField(
        choices=STATE_CHOICES,
        default=UNVIEWED,
    )

    invite = models.ForeignKey(Invite, null=True, blank=True)
    user = models.ForeignKey(User, null=True, blank=True, related_name="actions")
    text = models.CharField(max_length=1024)
    link = models.CharField(max_length=1024)
