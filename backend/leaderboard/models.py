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

@receiver(post_save, sender=User)
def create_user_leaderboard(sender, instance, created, **kwargs):
    if created:
        Leaderboard.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_leaderboard(sender, instance, **kwargs):
    try:
        instance.leaderboard.save()
    except Leaderboard.DoesNotExist:
        Leaderboard.objects.create(user=instance)

