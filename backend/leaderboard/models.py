from django.db import models
from django.contrib.auth.models import User

class Leaderboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)  # in seconds

    def __str__(self):
        return f"{self.user.username} - {self.score}"
