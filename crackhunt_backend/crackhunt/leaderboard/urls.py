from django.urls import path
from .views import LeaderboardListView
from .views import get_leaderboard, submit_score

urlpatterns = [
    path("leaderboard/", LeaderboardListView.as_view(), name="leaderboard"),
    path('get/', get_leaderboard, name='get_leaderboard'),
    path('submit/', submit_score, name='submit_score'),
]
