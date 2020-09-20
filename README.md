# Weather Dashboard

![Dashboard Thumbnail](assets/weatherThumbnail.png)

Weather Dashboard is a custom weather dashboard that displays basic weather data for any location. Once the user enters an address or city, Weather Dashboard displays the current weather for that location, as well has a 5 day forecast. It displays the UV index highlighted in color to give quick at-a-glance information about UV intensity.
Weather Dashboard relies on several server-side APIs for its functionality. The weather data that is presented to the user is gathered from OpenWeatherMap's OneCall API. Since the OneCall API requires the application to pass latitude and longitude coordinates to receive the weather data, GeoCodeAPI is used to return coordinates based on the user input. In addition, GeoCodeAPI's autofill API is used to supply autofill suggestions of locations as the user types. The autofill dropdown menu is built using only Vanilla JavaScript. 
The user's past entries are stored persistantly and displayed underneath the input field. This data is used to display the user's most recently entered location, and weather data for past entries can be easily loaded by clicking on the entry.


## Assignment from the client
### User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

### Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```