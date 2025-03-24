from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from leaderboard.models import Leaderboard
class GameLevel(models.Model):
    """Stores details about each game level."""
    level_number = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)  # e.g., "Tic-Tac-Toe"
    description = models.TextField()  # Short instructions for the game
    game_type = models.CharField(max_length=50, choices=[
        ('tic_tac_toe', 'Tic-Tac-Toe'),
        ('flappy_bird', 'Flappy Bird'),
        ('hanoi', 'Tower of Hanoi'),
        ('other', 'Other')
    ])
    completion_condition = models.JSONField()  # JSON to define what marks completion (e.g., {"score": 100})

    def __str__(self):
        return f"Level {self.level_number}: {self.title}"


class PlayerProgress(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    current_level = models.IntegerField(default=1)
    completed_levels = models.JSONField(default=list)
    total_time_spent = models.FloatField(default=0.0)

    def complete_level(self, level_number, time_taken, score):
        """Update progress and leaderboard when a level is completed."""
        if level_number == self.current_level:
            self.completed_levels.append(level_number)
            self.current_level += 1
            self.total_time_spent += time_taken
            self.save()

            # Update Leaderboard
            leaderboard, created = Leaderboard.objects.get_or_create(user=self.user)
            leaderboard.score += score  # Add points
            leaderboard.total_time_spent += time_taken
            leaderboard.last_completed_level = level_number
            leaderboard.save()

    def __str__(self):
        return f"{self.user.username} - Level {self.current_level}"