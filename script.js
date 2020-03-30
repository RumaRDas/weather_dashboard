
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

}