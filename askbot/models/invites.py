from django.db import models


class Invite(models.Model):
    email = models.EmailField()
    invite_code = models.CharField(max_length=255)
