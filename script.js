
const apiKey = "&appid=cd9a537cb0b8a066e19b9065531d35d3";

function getWeather(city, addButton) {

    // Querying the weather api for the selected city, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey;
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
        var dateFiled = $("<h4>").text(date);
        var image = $("<img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png'>").addClass("imgSize");
        var temperature = $("<p class='temp'>").text("Temperature: " + (response.main.temp) + " F");
        var humiDity = $("<p class='hum'>").text("Humidity:  " + (response.main.humidity) + " %");
        var windspeed = $("<p class='wind'>").text("WindSpeed: " + (response.wind.speed) + " m/s");

        $("#showweather").empty();
        $("#showweather").append(cityName, image, dateFiled, temperature, humiDity, windspeed);
        //    renderUV(response.coord.lat, response.coord.lon);

        if (addButton) {
            renderCities(response.name);
        }
    });
}
function renderUV(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=37.75&lon=-122.37"

}
//api.openweathermap.org/data/2.5/uvi/history?lat=37.75&lon=-122.37&start=1498049953&end=1498481991
/*
function renderUV(lat, lon){
    var uv = $("<p>").text("WindSpeed: " + (response.wind.speed) + "MPH");
}
*/
function renderCities(city) {
    var cityAdd = $("<button>").addClass("listStyle");
    cityAdd.text(city);
    $("#cityList").prepend(cityAdd);

    cityAdd.click(function (event) {
        //prevents the form from trying to submit itself.
        event.preventDefault();
        var selectCity = $(this).text();
        getWeather(selectCity, false);
        fiveDaysWeather(selectCity);
    });
}
//geting the weather of search cities
$("#searchbtn").click(function (event) {
    //prevents the form from trying to submit itself.
    $("#showweather").show();
    event.preventDefault();
    var inputCity = $("#city-input").val().trim();
    getWeather(inputCity, true);
    $(".new").show();
    fiveDaysWeather(inputCity);
});

//getting weather for 5 days
function fiveDaysWeather(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp",
    }).then(function (response) {
        // Printing the entire object to console
        console.log(response);

        let weatherlist = response.list;

        $("#fiveDays").html("");

        for (let i = 0; i < weatherlist.length; i++) {

            const listindex = i * 8 + 4;
            var weatherDesc = $("<div class ='col col-md-2 descrStyle'>");
            let date = new Date(response.list[listindex].dt * 1000).toISOString().slice(0, 10);
            var newdate = $("<p class='date'>").text(date);
            var newimage = $("<img src='https://openweathermap.org/img/wn/" + response.list[listindex].weather[0].icon + ".png'>").addClass("imgSize");
            var newTemperature = $("<p class='temp'>").text("Temperature: " + (response.list[listindex].main.temp) + " F");
            var newHumiDity = $("<p class='hum'>").text("Humidity:  " + (response.list[listindex].main.humidity) + " %");

            weatherDesc.append(newdate, newimage, newTemperature, newHumiDity);
            $("#fiveDays").append(weatherDesc);

        }

    });

}