from django.urls import path
from music_room_app.views import RoomView,CreateRoomView

urlpatterns = [
  path('', RoomView.as_view(), name='home'),
  path('create-room', CreateRoomView.as_view(), name='create'),
]