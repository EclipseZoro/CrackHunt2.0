from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Game
from .serializers import GameSerializer

@api_view(['GET'])
def game_list(request):
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data)
