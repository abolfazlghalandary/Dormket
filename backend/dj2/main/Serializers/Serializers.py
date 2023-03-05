from rest_framework import serializers

from main.models import Purchase, Sale, ForgottenCode


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('id', 'ownerUserId', 'clientUserId', 'createdTime', 'closedTime', 'goods', 'price')


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('id', 'ownerUserId', 'clientUserId', 'createdTime', 'closedTime', 'goods', 'price')


class ForgottenCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForgottenCode
        fields = ('id', 'ownerUserId', 'clientUserId', 'createdTime', 'closedTime', 'code', 'price')