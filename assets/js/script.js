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

// change the displayed photo size or check to make sure displayed photo size is big enough
// add another camera/API to the other photo
// figure out what image should be displayed on landing on the page - if any
// Maybe: do we want to see if we can match the sol day that is displayed in the Mars weather week to the sol day of the photo - waiting for Mars week to be added to explore

<<<<<<< HEAD
// call Mars Photo API for Opportunity Rover Pancam
=======
var getMarsWeather = function (data) {
    fetch("https://api.nasa.gov/insight_weather/?api_key=" + marsApiKey + "&feedtype=json&ver=1.0")
        .then(r => r.json())
        .then(function (data) {

            for (let i = 0; i < data.sol_keys.length; i++) {
                const key = data.sol_keys[i];
                var idmodifier = i === 0 ? "" : i + 1
                console.log(key, data[key])
                $("#sol" + idmodifier).text("Sol " + key)
                $("#date" + idmodifier).text(data[key].First_UTC)
                if (data[key].AT) {
                    $("#high" + idmodifier).text("High: " + data[key].AT.mx);
                    $("#low" + idmodifier).text("Low: " + data[key].AT.mn);
                    $("#wind-speed" + idmodifier).text("Wind Speed: " + data[key].HWS.av);
                } else {
                    $("#high" + idmodifier).text("High: " + data[key].PRE.mx)
                    $("#low" + idmodifier).text("Low: " + data[key].PRE.mn)
                }
                
            }

            console.log(data);

        })

}
getMarsWeather();
// call Mars Photo API
>>>>>>> main
var getMarsPhotos = function (sol) {
    var sol = 10 + Math.floor(Math.random() * (1000 - 10 + 1));
    var marsApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=" + sol + "&camera=pancam&api_key=" + marsApiKey;

    fetch(marsApiUrl).then(function (responseMarsPhoto) {
        responseMarsPhoto.json().then(function (photoData) {
            displayMarsPhotos(photoData);
        })
    })
};

// display Mars photo on the page 
var displayMarsPhotos = function (photoData) {
    console.log(photoData);

    // clear old content 
    photoOneEl.src = "";
    photoTwoEl.src = "";

    var randomNumber = Math.floor(Math.random() * photoData.photos.length);
    var randomNumberTwo = Math.floor(Math.random() * photoData.photos.length);
    console.log(randomNumber, randomNumberTwo);

    // if the img_src is empty then start getMarsPhotos over else change photo src

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
    city.innerText = "City:" + " " + where.city.name + ' ' + '(' + moment().format('ll') + ')'
    temp.innerText = "temp:" + " " + todayWeather.properties.periods[0].temperature + "°F"
    wind.innerText = "wind speed:" + " " + todayWeather.properties.periods[0].windSpeed
}

search.onclick = place;
