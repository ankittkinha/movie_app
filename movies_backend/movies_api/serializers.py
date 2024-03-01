from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = "__all__"
        
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data["username"],
            name = validated_data["name"],
            password = validated_data["password"],
            email = validated_data["email"]
        )
        return user
        
        
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        
        raise serializers.ValidationError("Username and password do not match.")
        
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"
        
        
class TheatreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theatre
        fields = "__all__"
        
        
    def create(self, validated_data):
        movie_data = validated_data.pop('movie')
        movie = Movie.objects.create(**movie_data)
        theatre = Theatre.objects.create(movie=movie, **validated_data)
        return theatre
              
        
class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    seats = SeatSerializer(many=True, read_only=True)
    theatre = TheatreSerializer(read_only=True)
    movie = MovieSerializer(read_only=True)

    # For writing, using primary key related fields
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='user')
    seat_ids = serializers.PrimaryKeyRelatedField(queryset=Seat.objects.all(), many=True, write_only=True, source='seats')
    theatre_id = serializers.PrimaryKeyRelatedField(queryset=Theatre.objects.all(), write_only=True, source='theatre')
    movie_id = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all(), write_only=True, source='movie')

    class Meta:
        model = Booking
        fields = ('id', 'user', 'seats', 'theatre', 'movie', 'total_cost', 'booking_time', 'user_id', 'seat_ids', 'theatre_id', 'movie_id')

    def create(self, validated_data):
        seats_data = validated_data.pop('seats', [])
        booking = Booking.objects.create(**validated_data)
        booking.seats.set(seats_data)
        return booking

