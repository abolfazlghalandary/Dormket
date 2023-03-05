from django.urls import path
from . import views

urlpatterns = [
    path('score', views.get_score, name='first_api'),
    path('purchase', views.PurchaseView.as_view(), name='purchase'),
    path('sale', views.SaleView.as_view(), name='sale'),
    path('forgottonCode', views.ForgottenCodeView.as_view(), name='forgotten code'),
    path("register", views.Register.as_view(), name="register"),
    path("login", views.Login.as_view(), name="login"),
    path("logout", views.Logout.as_view(), name="logout"),
    path("test", views.TestAPi.as_view(), name="test")
]
