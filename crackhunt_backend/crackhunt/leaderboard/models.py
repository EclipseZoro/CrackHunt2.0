from django.db import models
from users.models import CustomUser

class LeaderboardEntry(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    score = models.IntegerField()
    total_time = models.FloatField()

    class Meta:
        ordering = ['-score', 'total_time']  # Highest score first, lowest time wins

    def __str__(self):
        return f"{self.user.username} - Score: {self.score}, Time: {self.total_time}s"
