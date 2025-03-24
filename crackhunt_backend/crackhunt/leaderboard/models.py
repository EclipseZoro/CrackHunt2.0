from django.db import models
from django.conf import settings

class Leaderboard(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="leaderboard_entry"
    )
    score = models.PositiveIntegerField(default=0)  # Ensure score is always non-negative
    total_time_spent = models.FloatField(default=0.0)  # Total time spent in all games
    last_completed_level = models.PositiveIntegerField(default=0)  # Ensure level is non-negative
    updated_at = models.DateTimeField(auto_now=True)  # Auto-update on changes

    class Meta:
        ordering = ["-score", "total_time_spent"]  # Higher score first, tie-breaker is time

    def __str__(self):
        return f"{self.user.username} - Score: {self.score}"

