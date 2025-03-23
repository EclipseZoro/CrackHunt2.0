from rest_framework import serializers
from .models import GameProgress

class GameProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameProgress
        fields = '__all__'
