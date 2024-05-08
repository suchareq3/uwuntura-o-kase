from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('login/', views.login, name = "login"),
    path('panel/', views.panel, name = 'panel'),
    path('gra/', views.gra, name = 'gra'),
    path('viewers/', views.viewers, name = 'viewers')
]
