from rest_framework import serializers
from .models import Leaderboard

class LeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)  # ✅ Include username

    class Meta:
        model = Leaderboard
        fields = ['id', 'username', 'score', 'total_time']  # ✅ More structured response
