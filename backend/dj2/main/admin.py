from django.contrib import admin
from main.models import ForgottenCode, Sale, Purchase

admin.site.register(ForgottenCode)
admin.site.register(Sale)
admin.site.register(Purchase)