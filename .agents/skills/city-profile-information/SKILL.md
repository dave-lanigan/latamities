---
name: city-profile-information
description: This skill is meant to assist an agent in adding or updating a city to the application. It will take in a city name and return a confirmation message once the city has been added successfully.
---

## About section

When gathering information be sure to search for information about the following:

- top local foods its known for
- if the country is a coffee producer
- if the country is a wine producer
- any local types of liquor or spirits that are produced
- any well know cocktails that originate in the city

## Internet speed.

When adding internet speed the first place to check is speedtest.net. If the city can be found there use the data from that site.

## Neighborhoods and stays

There are (3) neighborhoods we define:
(1) turist area (2) residential area (3) hip area

Try to identifying these areas you do not have to include all 3 if they dont exist.

For examaple for Quito:

tourist area is: Centro Historico
hip area is: La Floresta
residential area is: La Carolina

For Lima:
 tourist area is: Miraflores
 hip area is: Barranco
 residential area is: San Isidro

For every listed neighborhood, check OpenStreetMap for an exact boundary polygon. If one exists, fetch it, save it as GeoJSON in `data/neighborhood-boundaries/`, and render it on the city profile map. Use a distinct color for each neighborhood boundary and match that color on the neighborhood label. If no exact OSM polygon exists, state that explicitly and do not draw a fake boundary.

## Ride sharing services

When adding ride sharing services, check which ride sharing services are available.

## Food delivery services

When adding food delivery services, check which food delivery services are available.

## Uber from the airport

Do a google search and find out whether you can take uber from the airport. Many cities do not allow this so it must be checked.

## Restaurants & Bars

Use the scripts/update-50-best.mjs to fetch the 50 best restaurants and bars in the city. This will be used to populate the database with the best places to eat and drink.
