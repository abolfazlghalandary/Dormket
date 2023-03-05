from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from main.Serializers.Serializers import PurchaseSerializer, SaleSerializer, ForgottenCodeSerializer
from main.models import Purchase, Sale, ForgottenCode, DormketUser, Score

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User

from django.db import transaction
from django.db.models import Avg


import datetime


from django.utils.timezone import make_aware
from rest_framework.decorators import api_view


def check_token(request):
    return not request.user.is_anonymous


@api_view(['GET'])
def get_score(request):
    user_id = request.query_params['userId']
    score = Score.objects.filter(scoreReceiverId=user_id).aggregate(Avg('value'))
    return Response(score, status=200)


@api_view(['POST'])
def add_score(request):
    if not check_token(request):
        return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)

    score_receiver_user_id = request.query_params['userId']
    user_id = request.user.id
    score = request.query_params['score']

    try:
        user = User.objects.get(id=score_receiver_user_id)
        if user is None:
            return Response('invalid user id', status=status.HTTP_400_BAD_REQUEST)

        sc = Score(scoreReceiverId=score_receiver_user_id, user_id=user_id, value=score)
        sc.save()
        return Response('success', status=status.HTTP_200_OK)

    except Exception as e:
        return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)


class EntityView:

    def __init__(self, entity, **kwargs):
        super().__init__(**kwargs)
        self.entity = entity

    def get_objects(self):
        if self.entity == "purchase":
            return Purchase.objects
        elif self.entity == "sale":
            return Sale.objects
        else:
            return ForgottenCode.objects

    def create_get_serializer(self, result):
        if self.entity == "purchase":
            return PurchaseSerializer(result, many=True)
        elif self.entity == "sale":
            return SaleSerializer(result, many=True)
        else:
            return ForgottenCodeSerializer(result, many=True)

    def create_post_serializer(self, data):
        if self.entity == "purchase":
            return PurchaseSerializer(data=data)
        elif self.entity == "sale":
            return SaleSerializer(data=data)
        else:
            return ForgottenCodeSerializer(data=data)

    def get(self, request):
        if not check_token(request):
            return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)

        objects = self.get_objects()
        result = objects.order_by('createdTime')

        if 'owner' in request.query_params:
            owner_user_id = request.query_params['owner']
            result = result.filter(ownerUserId=owner_user_id)
        elif 'client' in request.query_params:
            client_user_id = request.query_params['client']
            result = result.filter(clientUserId=client_user_id)
        else:
            result = result.all()

        serializers = self.create_get_serializer(result)
        return Response({'status': 'success', "entities": serializers.data}, status=200)

    def post(self, request):
        if not check_token(request):
            return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        data['createdTime'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        data['ownerUserId'] = request.user.id

        serializer = self.create_post_serializer(data)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        if not check_token(request):
            return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)

        entities_id = request.query_params['id']
        entity = self.get_objects().get(id=entities_id)
        if entity is None:
            return Response('invalid id', status=status.HTTP_400_BAD_REQUEST)

        entity.clientUserId = request.user.id
        entity.closedTime = datetime.datetime.now()

        current_user = User.objects.get(id=request.user.id)
        current_user.dormketuser.credit -= entity.price

        sid = transaction.savepoint()

        try:
            transaction.savepoint_commit(sid)
            entity.save()
            current_user.dormketuser.save()
            return Response('success', status=status.HTTP_200_OK)

        except Exception as e:
            transaction.savepoint_rollback(sid)
            return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)


class PurchaseView(APIView):
    entityView = EntityView("purchase")

    def get(self, request):
        return self.entityView.get(request)

    def post(self, request):
        return self.entityView.post(request)

    def put(self, request):
        return self.entityView.put(request)


class SaleView(APIView):
    entityView = EntityView("sale")

    def get(self, request):
        return self.entityView.get(request)

    def post(self, request):
        return self.entityView.post(request)

    def put(self, request):
        return self.entityView.put(request)


class ForgottenCodeView(APIView):
    entityView = EntityView("forgotten code")

    def get(self, request):
        return self.entityView.get(request)

    def post(self, request):
        return self.entityView.post(request)

    def put(self, request):
        return self.entityView.put(request)


class Register(APIView):
    def post(self, request):
        if request.data['password1'] != request.data['password2']:
            return Response('two different passwords', status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password1'])
        user.save()

        DormketUser(user=user, credit=10).save()

        return Response('success', status=status.HTTP_200_OK)


class Login(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)
            return Response('success', status=status.HTTP_200_OK)
        else:
            return Response('failed', status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def get(self, request):
        logout(request)
        return Response('ss', status=status.HTTP_200_OK)




class TestAPi(APIView):
    def get(self, request):
        current_user = request.user
        current_user_db = User.objects.get(id=current_user.id)
        current_user_db.dormketuser.credit = 5
        current_user_db.dormketuser.save()
        return Response('success', status=status.HTTP_200_OK)
