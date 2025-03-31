from django.urls import path
from . import views

urlpatterns = [
    path('', views.leaderboard_list, name='leaderboard-list'),
    path('user-score/', views.get_user_score, name='user-score'),
    path('update-score/', views.update_score, name='update-score'),

]
