from django.urls import path
from .views import get_odds

urlpatterns = [
    path("api/odds/", get_odds, name="get_odds"),
]
