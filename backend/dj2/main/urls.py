from django.urls import path
from . import views

urlpatterns = [
    path('getScore', views.get_score, name='get score'),
    path('score', views.add_score, name='score'),
    path('purchase', views.PurchaseView.as_view(), name='purchase'),
    path('sale', views.SaleView.as_view(), name='sale'),
    path('codeSale', views.ForgottenCodeForSaleView.as_view(), name='code1'),
    path('codePurchase', views.ForgottenCodeForPurchaseView.as_view(), name='code2'),
    path("register", views.Register.as_view(), name="register"),
    path("login", views.Login.as_view(), name="login"),
    path("logout", views.Logout.as_view(), name="logout"),
    path("test", views.TestAPi.as_view(), name="test"),
    path("Credit", views.Credit.as_view(), name="Credit"),
    path("DailyIncome", views.DailyIncome.as_view(), name="DailyIncome"),
]
