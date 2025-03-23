from django.db import models
from users.models import CustomUser

class GameProgress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    level = models.IntegerField()
    score = models.IntegerField()
    time_taken = models.FloatField()
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Level {self.level}"
