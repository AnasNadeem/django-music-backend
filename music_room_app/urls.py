from django.urls import path
from music_room_app.views import (
  CreateRoomView, 
  GetRoom, 
  JoinRoom,
  RoomListView,
  UserInRoom )

urlpatterns = [
  path('', RoomListView.as_view()),
  path('create-room', CreateRoomView.as_view()),
  path('get-room', GetRoom.as_view()),
  path('join-room', JoinRoom.as_view()),
  path('user-in-room', UserInRoom.as_view()),
]