from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Count
from .models import Leaderboard
from .serializers import LeaderboardSerializer

@api_view(['GET'])
def leaderboard_list(request):
    leaderboard = Leaderboard.objects.all().order_by('-score', 'total_time')[:5]
    serializer = LeaderboardSerializer(leaderboard, many=True)
    
    # Structure the response to match frontend expectations
    response_data = {
        'top_players': serializer.data
    }
    
    # Add user rank if user is authenticated
    if request.user.is_authenticated:
        try:
            user_score = Leaderboard.objects.get(user=request.user)
            rank = Leaderboard.objects.filter(
                score__gt=user_score.score
            ).count() + 1
            
            response_data['user_rank'] = {
                'rank': rank,
                'score': user_score.score,
                'username': request.user.username
            }
        except Leaderboard.DoesNotExist:
            response_data['user_rank'] = None
    
    return Response(response_data)