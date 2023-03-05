from django.db import models
from django.contrib.auth.models import User


class DormketUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    credit = models.IntegerField()


class Purchase(models.Model):
    ownerUserId = models.CharField(max_length=30)
    clientUserId = models.CharField(max_length=30, blank=True, null=True)
    createdTime = models.DateTimeField()
    closedTime = models.DateTimeField(blank=True, null=True)
    goods = models.CharField(max_length=200)
    price = models.IntegerField()


class Sale(models.Model):
    ownerUserId = models.CharField(max_length=30)
    clientUserId = models.CharField(max_length=30, blank=True, null=True)
    createdTime = models.DateTimeField()
    closedTime = models.DateTimeField(blank=True, null=True)
    goods = models.CharField(max_length=200)
    price = models.IntegerField()


class ForgottenCode(models.Model):
    ownerUserId = models.CharField(max_length=30)
    clientUserId = models.CharField(max_length=30, blank=True, null=True)
    createdTime = models.DateTimeField()
    closedTime = models.DateTimeField(blank=True, null=True)
    code = models.CharField(max_length=6)
    price = models.IntegerField()


class Score(models.Model):

    userId = models.IntegerField()
    scoreReceiverId = models.IntegerField()
    value = models.IntegerField()
    class Meta:
        unique_together = (('userId', 'scoreReceiverId'),)

