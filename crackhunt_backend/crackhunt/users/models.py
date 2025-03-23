from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Unique Email for login
    score = models.IntegerField(default=0)  # Track user score
    total_time = models.FloatField(default=0.0)  # Total time taken to complete levels

    def __str__(self):
        return self.username
