from rest_framework import generics
from music_room_app.serializers import RoomSerializer
from music_room_app.models import Room
# Create your views here.
class RoomView(generics.CreateAPIView):
  queryset = Room.objects.all()
  serializer_class = RoomSerializer