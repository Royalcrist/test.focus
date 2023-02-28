from django.urls import path
from . import views

urlpatterns = [
    path('efficient/', views.benchmark_efficient,
         name='efficient'),
    path('naive/', views.benchmark_naive, name='naive'),
    path('', views.benchmark, name='benchmark'),
]
