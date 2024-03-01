from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username is required.")

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        user = self.create_user(username, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"

    objects = UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    genre = models.CharField(max_length=100)
    image = models.URLField()
    language = models.CharField(max_length=100)
    rating = models.FloatField()
    director = models.CharField(max_length=100)
    runtime = models.IntegerField()
    release_year = models.IntegerField(null=True)

    def __str__(self):
        return self.title
    
    
class Theatre(models.Model):
    movie =models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="theatres")
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    pincode = models.IntegerField()
    date = models.DateTimeField(null=True)


class Seat(models.Model):
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=10)
    is_reserved = models.BooleanField(default=False)
    category = models.CharField(max_length=100)
    price = models.FloatField(default=0.00)

    def __str__(self):
        return f"{self.theatre.name} - Seat {self.seat_number}"


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movie")
    seats = models.ManyToManyField(Seat, related_name="seats")
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE, related_name="theatre")
    total_cost = models.FloatField(default=200.00)
    booking_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.movie.title}"
    
