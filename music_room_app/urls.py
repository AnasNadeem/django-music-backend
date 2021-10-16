from django.urls import path
from music_room_app.views import RoomView

urlpatterns = [
  path('', RoomView.as_view(), name='home')
]