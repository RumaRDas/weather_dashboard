
const apiKey = "&appid=cd9a537cb0b8a066e19b9065531d35d3";

function getWeather(city) {

    // Querying the weather api for the selected city, the ?app_id parameter is required, but can equal anything
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey;
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Printing the entire object to console
        console.log(response);
        // Constructing HTML containing the weather information
        var cityName = $("<h1>").text(response.name);
        let date = new Date().toISOString().slice(0, 10);
        var dateFiled =$("<h4>").text(date);
        var image = $("<img src='http://openweathermap.org/img/wn/"+response.weather[0].icon+".png'>").addClass("imgSize");
        var temperature = $("<p>").text("Temperature: " + (response.main.temp) + " F");
        var humiDity = $("<p>").text("Humidity:  " + (response.main.humidity) + " %");
        var windspeed = $("<p>").text("WindSpeed: " + (response.wind.speed) + " m/s");   
        var uv = $("<p>").text("WindSpeed: " + (response.wind.speed) + " MPH");
        $("#showweather").empty();
        $("#showweather").append(cityName,image, dateFiled, temperature, humiDity, windspeed, uv);
    //    renderUV(response.coord.lat, response.coord.lon);
        renderCities(response.name);
    });
}

//http://openweathermap.org/img/wn/10d@2x.png
/*
function renderUV(lat, lon){
    var uv = $("<p>").text("WindSpeed: " + (response.wind.speed) + "MPH");
}
*/
function renderCities(city) {
    var cityAdd = $("<button>").addClass("listStyle");
    cityAdd.text(city);
    $("#cityList").prepend(cityAdd);
}
//geting the weather of search cities
$("#searchbtn").click(function (event) {
    //prevents the form from trying to submit itself.
    $("#showweather").show();
    event.preventDefault();
    var inputCity = $("#city-input").val().trim();
    getWeather(inputCity);
    fiveDaysWeather(inputCity);
});

$(".listStylen").click(function (event) {
    //prevents the form from trying to submit itself.
    event.preventDefault();
    var selectCity = $('button').val();
    getWeather(selectCity);
    
});

//getting weather for 5 days
function fiveDaysWeather(city) {
 var days =5;
    // Querying the weather api for the 5 days selected city, the ?app_id parameter is required, but can equal anything
    var fiveQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + apiKey;
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: fiveQueryURL,
        method: "GET",
        dataType:"jsonp",
    }).then(function (data) {
        // Printing the entire object to console
        console.log(data);
        var wf = "";
       // City (displays once)
        $.each(data.list, function(index, val) {
          wf += "<p>" // Opening paragraph tag
          wf += "<b>Day " + index + "</b>: " // Day
          wf += val.main.temp + "&degC" // Temperature
          wf += "<span> | " + val.weather[0].description + "</span>"; // Description
          wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
          wf += "</p>" // Closing paragraph tag
        });
      /*  let weatherlist = data.list;
   
      for (let i=0; i< weatherlist.length; i++){
        var weatherDesc =$("<div class ='descrStyle'>");
        let date = new Date().toISOString().slice(0, 10);
        var newdate =$("<h4>").text(date);
        //var newimage = $("<img src='http://openweathermap.org/img/wn/"+data.weather[0].icon+".png'>").addClass("imgSize");
        var newTemperature = $("<p>").text("Temperature: " + (data.list.main.temp) + " F");
        var newHumiDity = $("<p>").text("Humidity:  " + (response.main.humidity) + " %");
      
        weatherDesc.append(newdate,newimage,newTemperature,newHumiDity);
        $("#fiveDyas").append(weatherDesc);
 
      }
*/
$("#fiveDya").html(wf);
    
    });
}