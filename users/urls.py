from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('agent/register/', Agent_UserCreate.as_view()),
    path('employe/register/', Employe_UserCreate.as_view()),
    path('responsable/register/', Responsable_UserCreate.as_view()),
    path('list/', ListUserViewsets.as_view()),
]
