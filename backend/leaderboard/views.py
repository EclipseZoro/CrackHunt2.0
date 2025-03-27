from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Leaderboard
from .serializers import LeaderboardSerializer

@api_view(['GET'])
def leaderboard_list(request):
    leaderboard = Leaderboard.objects.all().order_by('-score', 'total_time')[:5]
    serializer = LeaderboardSerializer(leaderboard, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_rank(request):
    if request.user.is_authenticated:
        user_score = Leaderboard.objects.get(user=request.user)
        return Response({'rank': user_score.id, 'score': user_score.score, 'time': user_score.total_time})
    return Response({'error': 'User not authenticated'}, status=401)
