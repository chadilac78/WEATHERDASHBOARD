var cities = [];



retrieveCities();
function retrieveCities() {
    let past_cities = JSON.parse(localStorage.getItem("cities"));
    if (past_cities !== null) {
        cities = past_cities
    }
    renderCityButtons();
}
function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCityButtons() {
    $("#past-cities-container").empty();
    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {
        console.log(cities);
        // Then dynamicaly generating buttons for each city in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of nameOfCity to our button
        a.addClass("nameOfCity");
        // Adding a data-attribute
        a.attr("city", cities[i]);
        // Providing the initial button text
        a.text(cities[i]);
        // Adding the button to the HTML
        $("#past-cities-container").prepend(a);
    }
}


$("#search").on("click", function (event) {
    var city = $("#city").val().trim();
    console.log(city);
    cities.push(city);
    saveCities();
    retrieveCities();
    renderCityButtons();
    callAPI();
});

$(document).on("click", ".nameOfCity", renderCityButtons);


function callAPI() {
    for (i = 0; i < cities.length; i++) {
        var recent_city = cities[cities.length - 1];
    }


    url = "api.openweathermap.org/data/2.5/weather?q=";
    city = recent_city;
    apiKey = "&appid=9fd1c3fbc23c725a7dcf0af637f4f01f";
    queryurl = url + city + apiKey;
    console.log(queryurl)
    console.log(recent_city)

    $("#city_name").text("Today's Weather in " + recent_city);

    $.ajax({
        url: queryurl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    })
}
