from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    max_score = models.IntegerField(default=0)

    def __str__(self):
        return self.name
