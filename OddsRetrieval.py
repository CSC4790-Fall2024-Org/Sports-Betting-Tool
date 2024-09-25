import requests

# API endpoint
url = "https://data.oddsblaze.com/v1/odds/draftkings_nfl.json?key=OBFos4vLRbkm25hvloJO"

# Make the GET request
response = requests.get(url)

import json


data = response.json()

# Step 3: Sort the events and markets
for game in data["games"]:
    event_name = f"{game['teams']['away']['name']} vs {game['teams']['home']['name']}"
    print(f"Event: {event_name}")

    for sportsbook in game["sportsbooks"]:
        print(f"\nSportsbook: {sportsbook['name']}")
        for odds in sportsbook["odds"]:
            market = odds["market"]
            team = odds["name"]
            price = odds["price"]
            print(f"Market: {market} | Team: {team} | Odds: {price}")


# Check if the request was successful
if response.status_code == 200:
    print("Success")
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")
