from django.contrib import admin
from .models import Leaderboard

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ("user", "score", "total_time_spent", "last_completed_level")
