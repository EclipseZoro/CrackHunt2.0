from django.urls import path
from .views import get_levels, submit_answer, get_leaderboard

urlpatterns = [
    path('levels/', get_levels),
    path('submit/', submit_answer),
    path('leaderboard/', get_leaderboard),
]
