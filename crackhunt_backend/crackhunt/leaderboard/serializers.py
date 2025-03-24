from rest_framework import serializers
from .models import Leaderboard

class LeaderboardSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username")  # Display username instead of ID

    class Meta:
        model = Leaderboard
        fields = ["user", "score", "total_time_spent", "last_completed_level"]
