var cities = [];


// function generateCityName() {
//     var nameOfCity = $(this).attr("city");
//     console.log(nameOfCity)


// }
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
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    //event.preventDefault();
    //grabs input from city search
    var city = $("#city").val().trim();
    cities.push(city);
    saveCities();
    retrieveCities();
    renderCityButtons();
});

$(document).on("click", ".nameOfCity", renderCityButtons);
