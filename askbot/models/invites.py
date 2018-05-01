import random, string

from django.db import models


class Invite(models.Model):
    email = models.EmailField()
    invite_code = models.CharField(max_length=255)

    @staticmethod
    def create_invite(email):
        invite = Invite()
        invite.email = email
        code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
        invite.invite_code = code
        invite.save()
        return invite

    @staticmethod
    def assign_new_user_to_invite_actions(user, invite_code):
        invite = Invite.objects.get(invite_code=invite_code)
        for action in invite.actions.all():
            action.user = user
            action.save()

