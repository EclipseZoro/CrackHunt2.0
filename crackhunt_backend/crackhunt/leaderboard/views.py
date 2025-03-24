from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import F

# from .serializers import LeaderboardSerializer
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
@api_view(['GET'])
def get_leaderboard(request):
    """Fetches the leaderboard sorted by score (higher is better) and time (lower is better)."""
    leaderboard = Leaderboard.objects.order_by('user__username','score', 'total_time_spent')[:10]  # Top 10 players
    serializer = LeaderboardSerializer(leaderboard, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_score(request):
    """Updates the user's leaderboard entry with a new score and time."""
    user = request.user
    score = request.data.get('score')
    total_time = request.data.get('total_time')

    if score is None or total_time is None:
        return Response({'error': 'Score and total_time are required.'}, status=400)

    # Update or create the user's leaderboard entry
    entry, created = Leaderboard.objects.update_or_create(
        user=user,
        defaults={'score': F('score') + score, 'total_time': F('total_time') + total_time}
    )
    
    return Response({'message': 'Score submitted successfully!'})