from django.urls import path
from . import views

urlpatterns = [
    path('progress/', views.get_progress, name="get_progress"),
    path('complete/', views.complete_level, name="complete_level"),
    path('levels/', views.get_levels, name="get_levels"),
]
