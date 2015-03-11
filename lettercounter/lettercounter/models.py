from django.db import models


class Count(models.Model):
    letter = models.CharField(max_length=1)
    count = models.BigIntegerField()