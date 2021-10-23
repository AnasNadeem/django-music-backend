from django.urls import path  
from spotify.views import AuthURL, spotify_callback, IsAuthenticated
urlpatterns = [
  path('get-auth-url', AuthURL.as_view()),
  path('redirect', spotify_callback),
  path('is-authen', IsAuthenticated.as_view()),
]