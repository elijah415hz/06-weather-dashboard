var city = "seattle";
console.log("Salmon")



geocodeURL = "https://app.geocodeapi.io/api/v1/search?text="+ city +"&apikey=0a157990-f940-11ea-ac04-cb65445966da"

$.ajax({
    // Get lat lon from city
    url: geocodeURL,
      method: "GET"
  }).then(function(response){
      console.log("Geocode:", response.bbox);
      var lat = (response.bbox[3] + response.bbox[1]) / 2;
      var lon = (response.bbox[2] + response.bbox[0]) / 2;
      console.log("lat:", lat);
      console.log("lon", lon);
      
      // Get weather from lat lon
      var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&units=imperial&appid=b8490967e1286ac31919deba8dced9fc"
      $.ajax({
        url: weatherURL,
        method: "GET"
      }).then(function(weather) {
          console.log(weather);
          console.log("Temp:", weather.current.temp);
          console.log("Humidity:", weather.current.humidity);
          console.log("High Tomorrow:", weather.daily[0].temp.max);
          console.log("Low Tomorrow:", weather.daily[0].temp.min);
      });
  })