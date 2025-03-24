from rest_framework import serializers
from .models import Leaderboard

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['user', 'score', 'total_time']
