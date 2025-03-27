from django.urls import path
from .views import leaderboard_list, user_rank

urlpatterns = [
    path('', leaderboard_list, name='leaderboard'),  # Changed from 'leaderboard/' to ''
    path('user-rank/', user_rank, name='user-rank'),
]
