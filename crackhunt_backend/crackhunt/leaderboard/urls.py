from django.urls import path
from .views import LeaderboardListView

urlpatterns = [
    path("leaderboard/", LeaderboardListView.as_view(), name="leaderboard"),
]
