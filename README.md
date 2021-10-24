## Music Room 
This is music room web app where you can host a music room and make your friends join and let them know what you're listening.

## Running the music-room on your local env

You must have **Python** installed on your system.

1. Open **_powershell_** or **_cmd_** and clone the repository:

  ```
  git clone https://github.com/AnasNadeem/music-room.git
  ```

2. Change the directory 
  ```
  cd music-room
  ```

3. Create and activate virtual environment.

  For **_Linux_** users:

  ```
  py -m venv env && source ./env/bin/activate
  ```
   
  For **_Windows_** users:
  
  ```
  py -m venv env && .\env\scripts\activate
  ```

4. Install the dependencies from the **_rqrm.txt_**

  ```
  py -m pip install -r rqrm.txt
  ```

5. Run the application

  ```
  python manage.py runserver
  ```

#### Note: You must have spotify developer account with *client_id* and *client_secret*. Once you have it add it in environment variable with *CLIENT_ID* AND *CLIENT_SECRET* name.

## Project Directory Structure

```
music_room_app
music_room_frontend
mysite
spotify
.gitignore
.replit
db.sqlite3
manage.py
README.md
rqrm.txt
```

1. Main project folder is **_mysite_**. Its endpoints are:

```python 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('music_room_app.urls')),
    path('', include('music_room_frontend.urls')),
    path('spotify/', include('spotify.urls')),
]
```

2. music_room_app is a django-app contains the main Room create, join and host logic. Endpoint of API are:

```python
urlpatterns = [
  path('', RoomListView.as_view()),
  path('create-room', CreateRoomView.as_view()),
  path('get-room', GetRoom.as_view()),
  path('join-room', JoinRoom.as_view()),
  path('user-in-room', UserInRoom.as_view()),
  path('leave-room', LeaveRoom.as_view()),
  path('update-room', UpdateRoom.as_view()),
]
```

3. music_room_frontend is a django-react-app contains the react components and package json and others:

4. spotify is a django-app contains the spotify integrations logic.

```python
urlpatterns = [
  path('get-auth-url', AuthURL.as_view()),
  path('redirect', spotify_callback),
  path('is-authen', IsAuthenticated.as_view()),
  path('current-song', CurrentSong.as_view()),
  path('play', PlaySong.as_view()),
  path('pause', PauseSong.as_view()),
]
```

5. **_rqrm.txt_** contains the dependencies info with their versions.


### Future features

Online streaming the song in the room through Spotify, but it requires the premium account of Spotify.
