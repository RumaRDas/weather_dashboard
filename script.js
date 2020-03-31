
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
        var temperature = $("<p>").text("Temperature: " + (response.main.temp_min) + "F");
        var humiDity = $("<p>").text("Humidity:  " + (response.main.humidity) + "%");
        var windspeed = $("<p>").text("WindSpeed: " + (response.wind.speed) + "MPH");
        var uv = $("<p>").text("WindSpeed: " + (response.wind.speed) + "MPH");
        $("#showweather").empty();
        $("#showweather").append(cityName, date, temperature, humiDity, windspeed, uv);
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

$("#searchbtn").click(function (event) {
    //prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    var inputCity = $("#city-input").val().trim();
    // cities.push(city);
    //  searchcity();
    getWeather(inputCity);
});

{
// $("#seacrhbtn").click(function (event) {
//     //prevents the form from trying to submit itself.
//     // We're using a form so that the user can hit enter instead of clicking the button if they want
//     event.preventDefault();
//     var city = $("#city-input").val().trim();
//     cities.push(city);
//     searchcity();
//     getweather(city);

// });
/*
$(document).ready(function(){
    $("#seacrhbtn").click(function(){

        return getweather()
});
});
function getweather(){
    var city =$("#city-input").val();
    if(city != ""){
        $.ajax({
            url:"http://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=imperial" +"&APPID=cd9a537cb0b8a066e19b9065531d35d3",
            type:"GET",
            datatype: "jsonp",
            success: function(data){
              console.log (data);
               var widget =showResults(data);
              $("#showweather").html(widget);
              $("#city").val('');
            }
        });
    }else{
        $("#error").html("<div> Give a City Name </div>");
    }
}
function showResults(data){
    return "<h3>"+data.name+"</h3>"+
           "<h4> " + new Date(data.dt*1000).toISOString() + "</h4>: " +
           "<p>Temperature:  "+ data.main.temp_min +" &deg;F </p>"+
           "<p>Humidity:  "+ data.main.humidity +" % </p>"+
           "<p>WindSpeed:  "+ data.wind.speed +"  MPH </p>"+
           "<p>UV Index:  "+ data.main.temp +"  </p>"
    ;

}*/
}