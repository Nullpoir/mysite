from django.contrib import admin
from django.conf.urls import url
from . import views
from django.urls import path,include,reverse_lazy

urlpatterns = [
    path('inquiry/',views.inquiry,name="inquiry"),
]
