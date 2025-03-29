from django.urls import path
from . import views

urlpatterns = [
    path('', views.leaderboard_list, name='leaderboard-list'),
    path('user-rank/', views.get_user_rank, name='user-rank'),
]
