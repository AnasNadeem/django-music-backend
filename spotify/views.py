import os
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from spotify.utils import update_or_create_user_tokens, is_spotify_authenticated
from django.shortcuts import redirect

# Create your views here.
client_id = os.environ['CLIENT_ID']
client_secret = os.environ['CLIENT_SECRET']
REDIRECT_URI = "https://4f9b8679-494e-40ee-bb6a-bb0c84d4e1ca.id.repl.co/spotify/redirect"

class AuthURL(APIView):
  def get(self, request, format=None):
    scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

    url = Request('GET', 'https://accounts.spotify.com/authorize', params={
      'scope':scopes,
      'response_type':'code',
      'redirect_uri': REDIRECT_URI,
      'client_id': client_id
    }).prepare().url
    return Response({'url':url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
  code = request.GET.get('code')
  error = request.GET.get('error')

  response = post('https://accounts.spotify.com/api/token', data={
    'grant_type':'authorization_code',
    'code':code,
    'redirect_uri':REDIRECT_URI,
    'client_id':client_id,
    'client_secret':client_secret
  }).json()

  access_token = response.get('access_token')
  token_type = response.get('token_type')
  refresh_token = response.get('refresh_token')
  expires_in = response.get('expires_in')
  error = response.get('error')

  if not request.session.exists(request.session.session_key):
    request.session.create()

  update_or_create_user_tokens(request.session.session_key,access_token, token_type, expires_in, refresh_token)

  return redirect('frontend:')

class IsAuthenticated(APIView):
  def get(self, request, format=None):
    is_authenticated = is_spotify_authenticated(self.request.session.session_key)
    return Response({'status': is_authenticated}, status=status.HTTP_200_OK)