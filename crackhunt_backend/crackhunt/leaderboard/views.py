from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Leaderboard
from .serializers import LeaderboardSerializer

class LeaderboardListView(APIView):
    """Retrieve the top players ranked by score."""
    permission_classes = [AllowAny]  # Anyone can view the leaderboard

    def get(self, request):
        leaderboard = Leaderboard.objects.all()[:10]  # Get top 10 players
        serializer = LeaderboardSerializer(leaderboard, many=True)
        return Response(serializer.data)
