
var city;
var cityArr = JSON.parse(localStorage.getItem("cities"));
console.log(cityArr)
if (!cityArr) {
  cityArr = [];
} else {
  city = cityArr[0];
  loadCities()
  getWeather();
}

function loadCities() {
  $(".list-group").empty();
  for (var i=0; i<cityArr.length; i++) {
    var cityLi = $("<li class='list-group-item'>").text(cityArr[i]);
    $(".list-group").append(cityLi);
  }
}

// Autocomplete API through GeocodeAPI
$("#city-input").on("input", function(){
  var input = $("#city-input").val();
  queryURL = "https://app.geocodeapi.io/api/v1/autocomplete?apikey=0a157990-f940-11ea-ac04-cb65445966da&text="+input+"&size=5&layers=locality"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response.features[0].properties.label)
    var autoArr = [response.features[0].properties.label, response.features[1].properties.label];
    $("#city-input").autocomplete({source: autoArr});
  })
})


$("#cityBtn").on("click", function(event) {
  event.preventDefault();
  city = $("#city-input").val().trim();
  $("#city-input").val("");
  cityArr.unshift(city);
  // converting to Set to remove duplicates
  cityArr = Array.from(new Set(cityArr));
  localStorage.setItem("cities", JSON.stringify(cityArr));
  getWeather();
  loadCities();
})

$(".list-group").on("click", function(event){
  city = event.target.textContent;
  getWeather();
  
})

function getWeather() {
  // Get lat lon from city from geocode API
  var geocodeURL = "https://app.geocodeapi.io/api/v1/search?text=" + city + "&apikey=0a157990-f940-11ea-ac04-cb65445966da"
  $.ajax({
    url: geocodeURL,
    method: "GET"
  }).then(function (response) {
    console.log("Geocode:", response.bbox);
    var lat = (response.bbox[3] + response.bbox[1]) / 2;
    var lon = (response.bbox[2] + response.bbox[0]) / 2;
    // console.log("lat:", lat);
    // console.log("lon", lon);
    
    // Get weather from lat lon from openWeatherMap
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=b8490967e1286ac31919deba8dced9fc"
    $.ajax({
      url: weatherURL,
      method: "GET"
    }).then(function (response) {
      loadCurrentWeather(response);
      loadForecasts(response.daily);
    });
  })
}

function loadCurrentWeather(weather) {
  // console.log(weather);
  var currentDate = new Date(weather.current.dt * 1000).toLocaleDateString()
  // console.log(currentDate);

  // console.log("Temp:", weather.current.temp);
  // console.log("Humidity:", weather.current.humidity);
  
  var currentWeatherDiv = $("<div class='card-body'>");
  var cityDate = $("<h2>").text(`${city} (${currentDate})`);
  var iconCode = weather.current.weather[0].icon
  var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png")
  var temp = $("<p>").text(`Temperature: ${weather.current.temp} °F`);
  var humidity = $("<p>").text(`Humidity: ${weather.current.humidity}%`);
  var windSpeed = $("<p>").text(`Wind Speed: ${weather.current.wind_speed} MPH`);
  var uv = weather.current.uvi
  if (uv < 2) {
    var style = "background-color: green;";
  } else if (uv >= 2 && uv < 5) {
    var style = "background-color: yellow;";
  } else if (uv >= 5 && uv < 7) {
    var style = "background-color: orange;";
  } else if (uv >= 7 && uv < 10) {
    var style = "background-color: red;";
  } else if (uv >= 10) {
    var style = "background-color: rgb(141, 43, 222);";
  }
  var uvIndex = $("<p>").html(`UV Index: <span style="${style}" id="uv">${uv}<span>`);
  currentWeatherDiv.append(cityDate, icon, temp, humidity, windSpeed, uvIndex);
  $("#currentWeather").empty()
  $("#currentWeather").append(currentWeatherDiv);
}

function loadForecasts(forecasts) {
  var forecastHeader = $("<h2>").text("Forecast:")
  var forecastBox = $("<div class='flex-box'>")
  for (var i = 0; i < 5; i++) {
    var forecast = forecasts[i]
    var date = new Date(forecast.dt * 1000).toLocaleDateString();
    var temp = forecast.temp.day
    var humidity = forecast.humidity
    
    var forecastCard = $("<div class='card blue'>");
    var fCardBody = $("<div class='card-body pb-0'>");
    var fCardTitle = $("<h5 class='card-title'>");
    var iconCode = forecast.weather[0].icon
    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + iconCode + ".png")
    
    var fCardTemp = $("<p>")
    var fCardHumidity = $("<p>")
    fCardTitle.text(date)
    fCardTemp.text(`Temp: ${temp} °F`)
    fCardHumidity.text(`Humidity: ${humidity}%`)
    
    fCardBody.append(fCardTitle, icon, fCardTemp, fCardHumidity);
    forecastCard.append(fCardBody);
    forecastBox.append(forecastCard);
  }
  $(".forecast").empty();
  $(".forecast").append(forecastHeader, forecastBox);
  
  // console.log(new Date(forecast.dt * 1000).toLocaleDateString());
  // console.log("High:", forecast.temp.max);
  // console.log("Low:", forecast.temp.min);
  
  //TODO: Dynamically create card, load in date, icon, temp, humidity
  
}
