from django.db import models


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
