from django.urls import path
from music_room_app.views import home
urlpatterns = [
  path('', home, name='home')
]