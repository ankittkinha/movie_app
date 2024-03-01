from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import *
from .serializers import *


class SignupView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User account has been created successfuly."}, status=200)
        return Response(serializer.errors, status=400)
      
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, username=None):
        try:
            user = User.objects.get(username=username) if username else request.user
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404("User not found")
    
    
    def put(self, request, username=None):
        user = User.objects.get(username=username)
    
        new_data = request.data
        if new_data["username"] == user.username:
            serializer = UserSerializer(user, data=new_data, partial=True)
        
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User updated successfuly", "data": serializer.data}, status=200)
        
        return Response(serializer.errors, status=400 )
        
        
    def delete(self, request, username=None):
        user = User.objects.get(username=username)
        
        user.is_active = False
        user.save()
        
        return Response({"message": "User Deleted Successfuly."}, status=204)
    
class LoginView(APIView):
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = RefreshToken.for_user(user)
            return Response({
                "message": "Login Successful",
                "access_token": str(token.access_token),
                "refresh_token": str(token)
            }, status=201)
            
        return Response({"message": "Username and password do not match", "errors": serializer.errors}, status=400)


class MoviesView(APIView):
    def get(self, request):
        page_num = request.GET.get("page", 1)
        movies = Movie.objects.all()
        
        paginate = Paginator(movies, 8)
        page = paginate.get_page(page_num)
        serializer = MovieSerializer(page.object_list, many=True).data
        
        return Response({
            "data": serializer,
            "total_pages": paginate.num_pages,
            "current_page": page_num,
            "total_movies": movies.count()
        })
        
        
class MoviesPostView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        data = request.data
        
        serializer = MovieSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie added successfuly", "data": serializer.data}, status=201)
        return Response(serializer.errors, status=400)
    
    
class MoviesActionView(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request, title):
        movie = Movie.objects.get(title=title)
        new_data = request.data 
        serializer = MovieSerializer(movie, data=new_data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie details updated successfuly", "data": serializer.data}, status=200)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, title):
        movie = Movie.objects.get(title=title)
        
        movie.delete()
        
        return Response({"message": "Movie deleted successfuly"}, status=204)
        
        
class SearchView(APIView):
    def get(self, request):
        page_num = request.GET.get("page", 1)
        query = request.GET.get("s", None)
        genre = request.GET.get("genre", None)
        language = request.GET.get("language", None)
        location = request.GET.get("location", None)
        rating = request.GET.get("rating", None)
        
        movies = Movie.objects.all()
        
        movies = movies.filter(title__icontains=query)
        
        if genre:
            movies = movies.filter(genre__iexact=genre)
            
        if language:
            movies = movies.filter(language__iexact=language)
            
        if location:
            movies = movies.filter(location__iexact=location)
            
        if rating:
            min_rating = int(rating)
            movies = movies.filter(Q(rating__gte = min_rating) & Q(rating__lt = min_rating + 1))

        paginate = Paginator(movies, 8)
        page = paginate.get_page(page_num)
        serializer = MovieSerializer(page.object_list, many=True).data
        
        return Response({
            "data": serializer,
            "total_pages": paginate.num_pages,
            "total_movies": movies.count()
        })
    
    
class MovieDetailsView(APIView):
    def get(self, request, id):
        try:
            movie = Movie.objects.get(id=id)
            serializer = MovieSerializer(movie)
            return Response({"data": serializer.data}, status=200)
        except Movie.DoesNotExist:
            raise Http404
        
        
class ForgetPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if email is None:
            return Response({'error': 'Email address is required.'}, status=400)

        try:
            user = User.objects.get(email=email)
            serializer = UserSerializer(user)
            
            return Response({'message': 'Your email has been verified.', "data": serializer.data}, status=200)
        except User.DoesNotExist:
            return Response({'message': 'A user with this email does not exist.'}, status=404)
        
        
class UserPasswordUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        new_data = request.data 
        
        if 'password' in new_data:
            password = new_data.pop('password')
            user.set_password(password)
        
        serializer = UserSerializer(user, data=new_data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your password has been changed"}, status=200)
        return Response(serializer.errors, status=400)
    
    
class SeatNameView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, seat_id):
        seat = get_object_or_404(Seat, id=seat_id)
        
        serializer = SeatSerializer(seat)       
        return Response(serializer.data)
    
    
class TheatreForMovieView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, movie_id):
        try:
            theatre = Theatre.objects.get(movie=movie_id)
        except Theatre.DoesNotExist:
            theatre = None
        
        if theatre:
            serializer = TheatreSerializer(theatre)
            return Response(serializer.data, status=200)
        else:
            return Response({"message": "No Theatres Available"}, status=200)
        
        
class SeatsPerTheatreView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, theatre_id):
        seats = Seat.objects.filter(theatre=theatre_id)
               
        serializer = SeatSerializer(seats, many=True)      
        return Response(serializer.data, status=200)
    

class BookingView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, username):
        user = User.objects.get(username=username)
        bookings = Booking.objects.filter(user=user.id)
        
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)
    
    
    def post(self, request, username):
        user = User.objects.get(username=username)
        movie_id = request.data.get('movie')
        theatre_id = request.data.get('theatre')
        seat_ids = request.data.get('seats', [])
        
        print(request.data)
        
        seats = Seat.objects.filter(
            theatre=theatre_id, id__in=seat_ids)
        
        total_cost = request.data.get("total_cost")
        
        for seat in seats:
            seat.is_reserved = True
            seat.save()
            
        booking_data = {
            'user_id': user.id,
            'movie_id': movie_id,
            'theatre_id': theatre_id,
            'seat_ids': seat_ids,
            'total_cost': total_cost,
        }
        
        print(booking_data)

        serializer = BookingSerializer(data=booking_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
        
        