from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Leaderboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)  # in seconds

    def __str__(self):
        return f"{self.user.username} - {self.score}"

# ✅ Signal to create Leaderboard entry when a new User is registered
@receiver(post_save, sender=User)
def create_leaderboard_entry(sender, instance, created, **kwargs):
    if created:  # Only create if user is newly registered
        Leaderboard.objects.create(user=instance)
