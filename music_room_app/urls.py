from django.urls import path
from music_room_app.views import (
  RoomView,
  CreateRoomView, 
  GetRoom, 
  JoinRoom,
  RoomListView )

urlpatterns = [
  path('', RoomView.as_view()),
  path('list-room', RoomListView.as_view()),
  path('create-room', CreateRoomView.as_view()),
  path('get-room', GetRoom.as_view()),
  path('join-room', JoinRoom.as_view()),
]