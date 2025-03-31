from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.decorators import renderer_classes
from .models import Leaderboard
from .serializers import LeaderboardSerializer
from rest_framework import status
from django.utils import timezone
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

# a view that provides the particular user token 

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_score(request):
    """
    Get the authenticated user's score and time information using JWT.
    Requires a valid JWT token in the Authorization header.
    """
    user = request.user
    
    try:
        # Get the user's leaderboard entry
        leaderboard_entry = Leaderboard.objects.get(user=user)
        
        # Calculate the user's rank
        rank = Leaderboard.objects.filter(
            score__gt=leaderboard_entry.score
        ).count() + 1
        
        # Prepare the response data
        response_data = {
            'username': user.username,
            'score': leaderboard_entry.score,
            'total_time': leaderboard_entry.total_time,
            'rank': rank,
            'total_players': Leaderboard.objects.count()
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    except Leaderboard.DoesNotExist:
        # Create a new leaderboard entry if it doesn't exist
        leaderboard_entry = Leaderboard.objects.create(user=user)
        
        response_data = {
            'username': user.username,
            'score': leaderboard_entry.score,
            'total_time': leaderboard_entry.total_time,
            'rank': Leaderboard.objects.count(),  # Since score is 0, rank is last
            'total_players': Leaderboard.objects.count(),
            'note': 'New leaderboard entry created'
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_score(request):
    """
    Update the user's score and completed level.
    Required parameters:
    - level_completed: The level number that was completed
    - completion_time: Time taken to complete the level (in seconds)
    """
    level_completed = request.data.get('level_completed')
    completion_time = request.data.get('completion_time')
    
    if not level_completed or not completion_time:
        return Response(
            {'error': 'Level completed and completion time are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        level_completed = int(level_completed)
        completion_time = int(completion_time)
    except ValueError:
        return Response(
            {'error': 'Level completed and completion time must be integers'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = request.user
    
    try:
        # Get or create the user's leaderboard entry
        leaderboard_entry, created = Leaderboard.objects.get_or_create(user=user)
        
        # Update the score (assuming each level is worth 100 points)
        # Only update if the user hasn't completed this level before
        if not hasattr(leaderboard_entry, 'completed_levels') or level_completed > leaderboard_entry.completed_levels:
            leaderboard_entry.score = level_completed * 100
            leaderboard_entry.completed_levels = level_completed
            
            # Add the completion time to the total time
            leaderboard_entry.total_time += completion_time
            
            leaderboard_entry.save()
        
        # Calculate the user's rank
        rank = Leaderboard.objects.filter(
            score__gt=leaderboard_entry.score
        ).count() + 1
        
        response_data = {
            'username': user.username,
            'score': leaderboard_entry.score,
            'completed_levels': leaderboard_entry.completed_levels,
            'total_time': leaderboard_entry.total_time,
            'rank': rank,
            'total_players': Leaderboard.objects.count()
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )