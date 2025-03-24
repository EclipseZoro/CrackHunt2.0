from rest_framework import serializers
from .models import GameLevel, PlayerProgress

class GameLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameLevel
        fields = '__all__'


class PlayerProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerProgress
        fields = ['user', 'current_level', 'completed_levels', 'total_time_spent']
