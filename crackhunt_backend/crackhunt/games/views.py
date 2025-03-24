from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import GameLevel, PlayerProgress
from .serializers import GameLevelSerializer, PlayerProgressSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_progress(request):
    """Returns the current level and completed levels of the player."""
    user = request.user
    progress, _ = PlayerProgress.objects.get_or_create(user=user)
    serializer = PlayerProgressSerializer(progress)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_level(request):
    """Validates and records a completed level."""
    user = request.user
    data = request.data
    level_number = data.get("level_number")
    time_taken = data.get("time_taken", 0)  # Time spent in seconds

    # Get the level and player's progress
    progress = get_object_or_404(PlayerProgress, user=user)
    level = get_object_or_404(GameLevel, level_number=level_number)

    # Validate if the player is at this level
    if progress.current_level != level_number:
        return Response({"error": "You cannot complete this level yet!"}, status=400)

    # Mark the level as completed
    progress.complete_level(level_number, time_taken)

    return Response({
        "message": f"Level {level_number} completed!",
        "next_level": progress.current_level
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_levels(request):
    """Fetches all game levels."""
    levels = GameLevel.objects.all().order_by("level_number")
    serializer = GameLevelSerializer(levels, many=True)
    return Response(serializer.data)
