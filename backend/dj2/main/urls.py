from django.urls import path
from . import views

urlpatterns = [
    # path('', views.first_api, name='first_api'),
    path('purchase', views.PurchaseView.as_view(), name='purchase'),
    path('sale', views.SaleView.as_view(), name='sale'),
    path('forgottonCode', views.ForgottenCodeView.as_view(), name='forgotten code'),
    path("register", views.Register.as_view(), name="register"),
    path("test", views.TestAPi.as_view(), name="test")
]
