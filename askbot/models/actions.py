from django.db import models
from askbot.models.invites import Invite
from django.contrib.auth.models import User
from askbot.utils.html import site_url

class Action(models.Model):
    TODO = 0
    DONE = 1
    IRRELEVANT = 2

    STATE_CHOICES = (
        (TODO, 'Todo'),
        (DONE, 'Done'),
        (IRRELEVANT, 'Irrelevant'),
    )

    state = models.IntegerField(
        choices=STATE_CHOICES,
        default=TODO,
    )

    invite = models.ForeignKey(Invite, null=True, blank=True, related_name="actions")
    user = models.ForeignKey(User, null=True, blank=True, related_name="actions")
    text = models.CharField(max_length=1024)
    link = models.CharField(max_length=1024)

    def __unicode__(self):
        if self.invite:
            return "Invited " + self.invite.email + " to join " + self.text
        else:
            return self.get_string_for_int(self.state) + " : " + self.user.email + " : " + self.text

    def get_string_for_int(self, state_int):
        if state_int == Action.TODO:
            return "Todo"
        if state_int == Action.DONE:
            return "Done"
        if state_int == Action.IRRELEVANT:
            return "Irrelevent"

    def change_state_via_string(self, state_string):
        if state_string == "todo":
            self.state = self.TODO
        if state_string == "done":
            self.state = self.DONE
        if state_string == "irrelevant":
            self.state = self.IRRELEVANT
        self.save()

    @staticmethod
    def get_int_for_state_string(state_string):
        if state_string == "todo":
            return Action.TODO
        if state_string == "done":
            return Action.DONE
        if state_string == "irrelevant":
            return Action.IRRELEVANT

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
