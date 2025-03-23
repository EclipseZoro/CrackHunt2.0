from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameLevel, Leaderboard
from django.contrib.auth.hashers import check_password

@api_view(['GET'])
def get_levels(request):
    levels = GameLevel.objects.values('level_number', 'question')
    return Response({"levels": list(levels)})

@api_view(['POST'])
def submit_answer(request):
    data = request.data
    level = GameLevel.objects.get(level_number=data['level_number'])
    if check_password(data['answer'], level.answer_hash):
        return Response({"status": "correct"})
    return Response({"status": "incorrect"}, status=400)

@api_view(['GET'])
def get_leaderboard(request):
    scores = Leaderboard.objects.order_by('-score')[:10]
    return Response({"leaderboard": list(scores.values())})
