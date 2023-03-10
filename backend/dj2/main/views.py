from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from main.Serializers.Serializers import PurchaseSerializer, SaleSerializer, ForgottenCodeSerializer
from main.models import Purchase, Sale, ForgottenCode, DormketUser, Score, ForgottenCodeForSale, \
    ForgottenCodeForPurchase

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.utils import timezone

from django.db import transaction
from django.db.models import Avg, Sum

import datetime
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
    user_id = User.objects.get(id=request.user.id).dormketuser.id
    value = request.query_params['score']

    if not (value.isdigit() and 5 >= int(value) >= 1):
        return Response('invalid score', status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=score_receiver_user_id)
        if user is None:
            return Response('invalid user id', status=status.HTTP_400_BAD_REQUEST)

        scores = Score.objects.filter(scoreReceiverId=score_receiver_user_id, userId=user_id)
        if scores.count() == 0:
            score = Score(scoreReceiverId=score_receiver_user_id, userId=user_id, value=value)
            score.save()
            return Response('success', status=status.HTTP_200_OK)
        else:
            score = scores.first()
            score.value = value
            score.save()
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


from django.db.models import Count


class ForgottenCodeForSaleView(APIView):
    def get(self, request):
        prices = ForgottenCodeForSale.objects.values('price') \
                     .annotate(total_count=Count('id')).order_by('price')[:5]
        return Response(prices, status.HTTP_200_OK)

    def post(self, request):
        if not check_token(request):
            return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)
        user_id = request.user.id
        code = request.data['code']
        price = request.data['price']
        created_time = timezone.now()

        try:
            dormket_user = DormketUser.objects.get(user_id=user_id)
        except Exception as e:
            return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)

        matched_purchase_codes = ForgottenCodeForPurchase.objects.filter(price=price).order_by('createdTime')

        if matched_purchase_codes.count() == 0:
            try:
                f = ForgottenCodeForSale(dormketUser=dormket_user,
                                     code=code,
                                     price=price,
                                     createdTime=created_time)
                f.save()
                return Response('order successfully registered', status.HTTP_200_OK)
            except Exception as e:
                return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)
        else:
            sid = transaction.savepoint()
            try:
                matched_code = matched_purchase_codes.first()
                forgotten_code = ForgottenCode(buyer_id=matched_code.dormketUser_id,
                                               seller_id=dormket_user.id,
                                               createdTime=matched_code.createdTime,
                                               closedTime=created_time,
                                               code=code,
                                               price=price)
                dormket_user.credit += price

                dormket_user.save()
                forgotten_code.save()
                matched_code.delete()
                transaction.savepoint_commit(sid)
                return Response(matched_code.id, status.HTTP_200_OK)

            except Exception as e:
                transaction.savepoint_rollback(sid)
                return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)


class ForgottenCodeForPurchaseView(APIView):
    def get(self, request):
        prices = ForgottenCodeForPurchase.objects.values('price') \
                     .annotate(total_count=Count('id')).order_by('price')[:5]
        return Response(prices, status.HTTP_200_OK)

    def post(self, request):
        if not check_token(request):
            return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)
        user_id = request.user.id
        price = request.data['price']
        created_time = timezone.now()

        try:
            dormket_user = DormketUser.objects.get(user_id=user_id)
        except Exception as e:
            return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)

        if dormket_user.credit < price:
            return Response('not enough credit', status.HTTP_400_BAD_REQUEST)

        matched_selling_codes = ForgottenCodeForSale.objects.filter(price=price).order_by('createdTime')

        if matched_selling_codes.count() == 0:
            sid = transaction.savepoint()
            try:
                ForgottenCodeForPurchase(dormketUser=dormket_user,
                                         price=price,
                                         createdTime=created_time).save()
                dormket_user.credit -= price
                dormket_user.save()
                transaction.savepoint_commit(sid)
                return Response('order successfully registered', status.HTTP_200_OK)

            except Exception as e:
                transaction.savepoint_rollback(sid)
                return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)

        else:
            sid = transaction.savepoint()
            try:
                matched_selling_code = matched_selling_codes.first()
                forgotten_code = ForgottenCode(buyer_id=dormket_user.id,
                                               seller_id=matched_selling_code.dormketUser_id,
                                               createdTime=matched_selling_code.createdTime,
                                               closedTime=created_time,
                                               code=matched_selling_code.code,
                                               price=price)
                dormket_user.credit -= price
                matched_selling_code.dormketUser.credit += price

                dormket_user.save()
                matched_selling_code.dormketUser.save()
                forgotten_code.save()
                matched_selling_code.delete()
                transaction.savepoint_commit(sid)
                return Response(matched_selling_code.id, status.HTTP_200_OK)

            except Exception as e:
                transaction.savepoint_rollback(sid)
                return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)


# class ForgottenCodeController:
#     def post(self, request):
#         if not check_token(request):
#             return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)
#         user_id = request.user.id
#         price = request.data['price']
#         created_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
#
#         try:
#             dormket_user = DormketUser.objects.get(user_id=user_id)
#         except Exception as e:
#             return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)
#
#         ForgottenCodeForPurchase(dormketUser=dormket_user, price=price, createdTime=created_time).save()
#         return Response('success', status.HTTP_200_OK)


class Register(APIView):
    def post(self, request):
        if request.data['password1'] != request.data['password2']:
            return Response('two different passwords', status=status.HTTP_400_BAD_REQUEST)

        sid = transaction.savepoint()
        try:
            username = request.data['username']
            if User.objects.filter(username=username).count() != 0:
                return Response('duplicated username', status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password1'])
            user.save()
            DormketUser(user=user, credit=10).save()
            transaction.savepoint_commit(sid)
            return Response('success', status=status.HTTP_200_OK)
        except Exception as e:
            transaction.savepoint_rollback(sid)
            return Response(e.__str__(), status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)
            return Response('success', status=status.HTTP_200_OK)
        else:
            return Response('failed', status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response('success', status=status.HTTP_200_OK)


class Credit(APIView):
    def put(self, request):
        if not check_token(request):
            return Response('invalid token', status=status.HTTP_401_UNAUTHORIZED)
        user_id = request.user.id
        current_user_db = User.objects.get(id=user_id)
        current_user_db.dormketuser.credit += int(request.query_params['value'])
        current_user_db.dormketuser.save()
        return Response('success', status=status.HTTP_200_OK)


class DailyIncome(APIView):
    def get(self, request):
        user_id = request.user.id
        current_user_db = User.objects.get(id=user_id)
        dormket_user_id = current_user_db.dormketuser.id

        year = request.query_params['year']
        month = request.query_params['month']
        day = request.query_params['day']

        p1 = ForgottenCode.objects \
            .filter(closedTime__year=year, closedTime__month=month, closedTime__day=day) \
            .filter(buyer_id=dormket_user_id).aggregate(Sum('price'))

        p2 = ForgottenCode.objects \
            .filter(closedTime__year=year, closedTime__month=month, closedTime__day=day) \
            .filter(seller_id=dormket_user_id).aggregate(Sum('price'))

        p2 = p2['price__sum'] if p2['price__sum'] is not None else 0
        p1 = p1['price__sum'] if p1['price__sum'] is not None else 0

        pp1 = p2 - p1

        p3 = Purchase.objects \
            .filter(closedTime__year=year, closedTime__month=month, closedTime__day=day) \
            .filter(ownerUserId=dormket_user_id).aggregate(Sum('price'))

        p4 = Sale.objects \
            .filter(closedTime__year=year, closedTime__month=month, closedTime__day=day) \
            .filter(ownerUserId=dormket_user_id).aggregate(Sum('price'))

        p3 = p3['price__sum'] if p3['price__sum'] is not None else 0
        p4 = p4['price__sum'] if p4['price__sum'] is not None else 0

        pp2 = p4 - p3

        p6 = Purchase.objects \
            .filter(closedTime__year=year, closedTime__month=month, closedTime__day=day) \
            .filter(clientUserId=dormket_user_id).aggregate(Sum('price'))

        p5 = Sale.objects \
            .filter(closedTime__year=year, closedTime__month=month, closedTime__day=day) \
            .filter(clientUserId=dormket_user_id).aggregate(Sum('price'))

        p6 = p6['price__sum'] if p6['price__sum'] is not None else 0
        p5 = p5['price__sum'] if p5['price__sum'] is not None else 0

        pp3 = p6 - p5

        p = pp1 + pp2 + pp3
        print(p)
        return Response(p, status=status.HTTP_200_OK)

