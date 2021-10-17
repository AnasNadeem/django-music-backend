from django.urls import path  
from music_room_frontend.views import index
urlpatterns = [
  path('', index, name='index'),
  path('join', index),
  path('create', index),
]