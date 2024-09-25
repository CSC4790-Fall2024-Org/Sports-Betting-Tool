from django.shortcuts import render
from django.http import JsonResponse
import requests


# Create your views here.
def get_odds(request):
    url = "https://data.oddsblaze.com/v1/odds/draftkings_nfl.json?key=OBFos4vLRbkm25hvloJO"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP errors
        odds_data = response.json()  # Parse the response as JSON
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse(odds_data)
