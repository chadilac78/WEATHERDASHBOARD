var cities = [];

var nowTime = moment().format('HH:MM');
var nowDate = moment().format('MMMM Do YYYY');
console.log(nowDate);



//RETRIEVES CITY ARRAY FROM LOCAL STORAGE
retrieveCities();
function retrieveCities() {
    let past_cities = JSON.parse(localStorage.getItem("cities"));
    if (past_cities !== null) {
        cities = past_cities
    }
    renderCityButtons();
}
//SAVES CITIES ARRAY TO LOCAL STORAGE
function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

//CREATES BUTTONS FROM CITIES ARRAY IN LOCAL STORAGE
function renderCityButtons() {
    $("#past-cities-container").empty();
    for (var i = 0; i < cities.length; i++) {
        console.log(cities);
        var a = $("<button>");
        a.addClass("nameOfCity");
        a.attr("city", cities[i]);
        a.text(cities[i]);
        $("#past-cities-container").prepend(a);
    }
}

//GETS INPUT FROM CITY SEARCH
$("#search").on("click", function (event) {
    var city = $("#city").val().trim();
    console.log(city);
    cities.push(city);
    saveCities();
    retrieveCities();
    renderCityButtons();
    callAPI();
    past_city_click();

});

//GETS VALUE FROM PAST CITIES BUTTONS
function past_city_click() {
    $(".nameOfCity").on("click", function (event) {
        console.log("you clicked here")
        event.preventDefault();
        city = $(".nameOfCity").text().trim();
        console.log(city);
        callAPI();
    })
}

$(document).on("click", ".nameOfCity", renderCityButtons);


function callAPI() {
    for (i = 0; i < cities.length; i++) {
        var recent_city = cities[cities.length - 1];
    }


    var url = "http://api.openweathermap.org/data/2.5/weather?q=";
    var city = recent_city;
    var apiKey = "&appid=9fd1c3fbc23c725a7dcf0af637f4f01f";

    var queryurl = url + city + apiKey;
    console.log(queryurl)
    console.log(recent_city)

    $("#city_name").text("Today's Weather in  " + recent_city);

    $.ajax({
        url: queryurl,
        method: "GET",

    }).then(function (response) {
        console.log(response);
        var current_temp = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32))
        $("#current_date").text(nowDate);
        $("#current_temp").text("Current temperature in " + city + " is " + current_temp + " F");
        $("#current_humidity").text("Current Humidity: " + response.main.humidity + " % ");
        $("#current_wind_speed").text("Current Wind Speed: " + response.wind.speed);
        $("#current_pic_div").attr({
            "src": "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
            "height": "100px", "width": "100px"
        })
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;

        var UVurl = "http://api.openweathermap.org/data/2.5/uvi?";
        var queryUVurl = UVurl + apiKey + "&lat=" + latitude + "&lon=" + longitude;

        $.ajax({
            url: queryUVurl,
            method: "GET",
        }).then(function (UVdata) {
            console.log(UVdata);
            $("#uv_index").text("Current UV Index: " + UVdata.value);
        })


    })
}

