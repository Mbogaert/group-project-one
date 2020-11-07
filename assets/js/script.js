var marsApiKey = "GrZ5XxlNbYcBVTrWcEVaRSagQlzo9TgtCbACgo64";
var photoOneEl = document.querySelector("#photoOne");
var photoTwoEl = document.querySelector("#photoTwo");
var today = [];
var todayWeather = [];
var search = document.querySelector("#location");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var lat = ' ';
var lon = ' ';
var city = document.querySelector("#city");

// TBD 
// add another camera/API to the other photo
// photo sizing hmmm...
// check to make sure the array exists function - if it doesn't run getMarsPhotos again
// figure out what image should be displayed on landing on the page - if any

var getMarsWeather = function (data) {
    fetch("https://api.nasa.gov/insight_weather/?api_key=" + marsApiKey + "&feedtype=json&ver=1.0")
    .then(r => r.json())
    .then(function (data) {

        $("#sol").text("Sol " + data.sol_keys[0])
        $("#date").text(data[685].First_UTC)
        $("#high").text("High: " + data[685].AT.mx)
        $("#low").text("Low: " + data[685].AT.mn)
        $("#wind-speed").text("Wind Speed: " + data[685].HWS.av)

        $("#sol2").text("Sol " + data.sol_keys[1]);
        $("#date2").text(data[688].First_UTC);
        $("#high2").text("High: " + data[688].AT.mx);
        $("#low2").text("Low: " + data[688].AT.mn);
        $("#wind-speed2").text("Wind Speed: " + data[688].HWS.av);

        $("#sol3").text("Sol " + data.sol_keys[2]);
        $("#date3").text(data[689].First_UTC);
        $("#high3").text("High: " + data[689].AT.mx);
        $("#low3").text("Low: " + data[689].AT.mn);
        $("#wind-speed3").text("Wind Speed: " + data[689].HWS.av);
        
        $("#sol4").text("Sol " + data.sol_keys[3]);
        $("#date4").text(data[690].First_UTC);
        $("#high4").text("High: " + data[690].AT.mx);
        $("#low4").text("Low: " + data[690].AT.mn);
        $("#wind-speed4").text("Wind Speed: " + data[690].HWS.av);

        $("#sol5").text("Sol " + data.sol_keys[4]);
        $("#date5").text(data[691].First_UTC);
        $("#high5").text("High: " + data[691].AT.mx);
        $("#low5").text("Low: " + data[691].AT.mn);
        $("#wind-speed5").text("Wind Speed: " + data[691].HWS.av);

        console.log(data);
        
    })
    
}
getMarsWeather();
// call Mars Photo API
var getMarsPhotos = function (sol) {
    var sol = 10 + Math.floor(Math.random() * (1000 - 10 + 1));
    var marsApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&api_key=" + marsApiKey;

    fetch(marsApiUrl).then(function (responseMarsPhoto) {
        responseMarsPhoto.json().then(function (photoData) {
            displayMarsPhotos(photoData);
        })
    })
};

// display Mars photo on the page 
var displayMarsPhotos = function (photoData) {
    console.log(photoData);
    console.log(photoOneEl);

    // clear old content - so that with each run of the application new images are generated
    photoOneEl.src = "";
    photoTwoEl.src = "";
    console.log(photoOneEl);

    var randomNumber = Math.floor(Math.random() * photoData.photos.length);
    var randomNumberTwo = Math.floor(Math.random() * photoData.photos.length);
    console.log(randomNumber);

    var photoOne = photoData.photos[randomNumber].img_src;
    photoOneEl.src = photoOne;

    var photoTwo = photoData.photos[randomNumberTwo].img_src;
    photoTwoEl.src = photoTwo;
};


function place() {
    var cityName = document.querySelector("#search").value;

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            where = json
            lat = where.city.coord.lat
            lon = where.city.coord.lon
            earthWeather()
        })
}
function earthWeather() {
    fetch("https://api.weather.gov/points/" + lat + ',' + lon)

        .then(r => r.json())
        .then(function (json) {
            today = json
            console.log(today)
            fetch(today.properties.forecast)

                .then(r => r.json())
                .then(function (json) {
                    todayWeather = json
                    console.log(todayWeather)
                    EarthCurrentWeather()
                    getMarsPhotos();
                })
        })

}

function EarthCurrentWeather() {
    city.innerText = "City:" + " " + where.city.name
    temp.innerText = "temp:" + " " + todayWeather.properties.periods[0].temperature + "°F"
    wind.innerText = "wind speed:" + " " + todayWeather.properties.periods[0].windSpeed
}

search.onclick = place;
