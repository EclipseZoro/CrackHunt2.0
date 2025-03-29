from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.decorators import renderer_classes
from .models import Leaderboard
from .serializers import LeaderboardSerializer

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def leaderboard_list(request):
    leaderboard = Leaderboard.objects.all().order_by('-score', 'total_time')[:5]
    serializer = LeaderboardSerializer(leaderboard, many=True)
    
    response_data = {
        'top_players': serializer.data,
        'user_rank': None,
        'user_status': 'not_authenticated'  # Default status
    }
    
    if request.user.is_authenticated:
        response_data['user_status'] = 'authenticated'
        try:
            user_score = Leaderboard.objects.get(user=request.user)
            rank = Leaderboard.objects.filter(
                score__gt=user_score.score
            ).count() + 1
            
            response_data['user_rank'] = {
                'rank': rank,
                'score': user_score.score,
                'username': request.user.username,
                'total_time': user_score.total_time,
                'total_players': Leaderboard.objects.count()
            }
        except Leaderboard.DoesNotExist:
            response_data['user_status'] = 'no_leaderboard_entry'
            # Create an entry for the user with default values
            Leaderboard.objects.create(user=request.user)
    
    return Response(response_data)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_rank(request):
    try:
        user_score = Leaderboard.objects.get(user=request.user)
        rank = Leaderboard.objects.filter(
            score__gt=user_score.score
        ).count() + 1
        
        return Response({
            'rank': rank,
            'score': user_score.score,
            'total_time': user_score.total_time,
            'username': request.user.username,
            'total_players': Leaderboard.objects.count()
        })
    except Leaderboard.DoesNotExist:
        return Response({
            'error': 'User has no leaderboard entry',
            'username': request.user.username
        }, status=404)