from django.db import models
from askbot.models.invites import Invite
from django.contrib.auth.models import User
from askbot.utils.html import site_url

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

    invite = models.ForeignKey(Invite, null=True, blank=True, related_name="actions")
    user = models.ForeignKey(User, null=True, blank=True, related_name="actions")
    text = models.CharField(max_length=1024)
    link = models.CharField(max_length=1024)


    @staticmethod
    def create_topic_follow_action(thread, **kwargs):
        action = Action()
        action.text = "Follow the Topic : " + thread.title
        action.link = site_url(thread.get_absolute_url())
        if "user" in kwargs:
            action.user = kwargs["user"]
        if "invite" in kwargs:
            action.invite = kwargs["invite"]
        action.save()
        return action

    @staticmethod
    def create_tag_follow_action():
        pass
