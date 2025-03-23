from django.db import models

class GameLevel(models.Model):
    level_number = models.IntegerField(unique=True)
    question = models.TextField()
    answer_hash = models.CharField(max_length=256)  # Store hashed answers

class Leaderboard(models.Model):
    username = models.CharField(max_length=100, unique=True)
    score = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
