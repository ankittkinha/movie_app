from django.contrib import admin
from .models import *


admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Theatre)
admin.site.register(Seat)
admin.site.register(Booking)
