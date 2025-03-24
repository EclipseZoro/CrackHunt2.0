from django.db import models
from django.conf import settings

class Leaderboard(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)  # Total score from all games
    total_time_spent = models.FloatField(default=0.0)  # Total time spent in all games
    last_completed_level = models.IntegerField(default=0)  # Track last completed level
    updated_at = models.DateTimeField(auto_now=True)  # Auto-update on changes

    class Meta:
        ordering = ["-score", "total_time_spent"]  # Higher score first, tie-breaker is time

    def __str__(self):
        return f"{self.user.username} - Score: {self.score}"
