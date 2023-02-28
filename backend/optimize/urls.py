from django.urls import path
from . import views

urlpatterns = [
    path('efficient/', views.optimize_efficient,
         name='efficient'),
    path('naive/', views.optimize_naive, name='naive')
]
