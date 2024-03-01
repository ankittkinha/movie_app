from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import *

urlpatterns = [
    path('users/signup/', SignupView.as_view(), name="signup"),
    path('users/login/', LoginView.as_view(), name="login"),
    path('users/details/<str:username>/', UserView.as_view(), name="user-details"),
    path('users/forget/', ForgetPasswordView.as_view(), name="forget-password"),
    path('users/<int:user_id>/changepass/', UserPasswordUpdateView.as_view(), name="forget-password"),
    path('movies/', MoviesView.as_view(), name="movies"),
    path('movie/<int:id>/details/', MovieDetailsView.as_view(), name="movie-details"),
    path('admin/movies/post', MoviesView.as_view(), name="post-movies"),
    path('admin/movies/action', MoviesActionView.as_view(), name="movies-action"),
    path('movies/search/', SearchView.as_view(), name="search"),
    path('seats/<int:seat_id>/details/', SeatNameView.as_view(), name='seats-for-screening'),
    path('theatre/<int:theatre_id>/seats/', SeatsPerTheatreView.as_view(), name='theatre-seats'),
    path('movie/<int:movie_id>/theatres/', TheatreForMovieView.as_view(), name='movie-theatre'),
    path('users/booking/<str:username>/', BookingView.as_view(), name='booking'),   
]