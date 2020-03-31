
function getWeather(city) {

    // Querying the weather api for the selected city, the ?app_id parameter is required, but can equal anything
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=cd9a537cb0b8a066e19b9065531d35d3";
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
        var temperature = $("<p>").text("Temperature: " + (response.main.temp_min) + "F");
        var humiDity = $("<p>").text("Humidity:  " + (response.main.humidity) + "%");
        var windspeed = $("<p>").text("WindSpeed: " + (response.wind.speed) + "MPH");
        var uv = $("<p>").text("WindSpeed: " + (response.wind.speed) + "MPH");
        $("#showweather").empty();
        $("#showweather").append(cityName, dateFiled, temperature, humiDity, windspeed, uv);
    //    renderUV(response.coord.lat, response.coord.lon);
        renderCities(response.name);
    });
}
/*
function renderUV(lat, lon){
    var uv = $("<p>").text("WindSpeed: " + (response.wind.speed) + "MPH");
}
*/
function renderCities(city) {
    cityAdd = $("<li>").addClass("listStyle");
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
});


