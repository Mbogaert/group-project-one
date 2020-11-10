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
var searchHistoryEl = $(".historyItems");

var info = document.querySelector("#info");
var day1 = document.querySelector("#day1");
var temp1 = document.querySelector("#temp1");
var wind1 = document.querySelector("#wind1");
var day2 = document.querySelector("#day2");
var temp2 = document.querySelector("#temp2");
var wind2 = document.querySelector("#wind2");
var day3 = document.querySelector("#day3");
var temp3 = document.querySelector("#temp3");
var wind3 = document.querySelector("#wind3");
var day4 = document.querySelector("#day4");
var temp4 = document.querySelector("#temp4");
var wind4 = document.querySelector("#wind4");
var day5 = document.querySelector("#day5");
var temp5 = document.querySelector("#temp5");
var wind5 = document.querySelector("#wind5");

// add another camera/API to the other photo
// figure out what image should be displayed on landing on the page -
// Maybe: do we want to see if we can match the sol day that is displayed in the Mars weather week to the sol day of the photo - waiting for Mars week to be added to explore

var getMarsWeather = function (data) {
    fetch("https://api.nasa.gov/insight_weather/?api_key=" + marsApiKey + "&feedtype=json&ver=1.0")
        .then(r => r.json())
        .then(function (data) {

            for (let i = 0; i < data.sol_keys.length; i++) {
                const key = data.sol_keys[i];
                var idmodifier = i === 0 ? "" : i + 1
                // console.log(key, data[key])
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

            //console.log(data);

        })

}
getMarsWeather();

// // call Mars Photo APIs for Opportunity and Spirit Rover Pancams for the same random day
function getMarsPhotos(sol) {
    var sol = 10 + Math.floor(Math.random() * (1000 - 10 + 1));
    var opportunityApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=" + sol + "&camera=pancam&api_key=" + marsApiKey;
    var spiritApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=" + sol + "&camera=pancam&api_key=" + marsApiKey;

    // fetch the opportunity API
    fetch(opportunityApiUrl).then(function (responseOpportunityPhoto) {
        responseOpportunityPhoto.json().then(function (photoData) {
            displayMarsPhotoOne(photoData);
        })
    })
    // fetch the spirit API
    fetch(spiritApiUrl).then(function (responseSpiritPhoto) {
        responseSpiritPhoto.json().then(function (photoDataTwo) {
            displayMarsPhotoTwo(photoDataTwo)
        })
    })
};

// display Mars photo one on the page 
function displayMarsPhotoOne(photoData) {

    // clear old content 
    photoOneEl.src = "";

    var randomNumber = Math.floor(Math.random() * photoData.photos.length);

    // if the photo array is empty, run getMarsphotos again
    if (photoData.photos.length === 0) {
        getMarsPhotos();
    } // display the photos if they are available
    else {
        var photoOne = photoData.photos[randomNumber].img_src;
        photoOneEl.src = photoOne;
    };
};

// display Mars photo two
function displayMarsPhotoTwo (photoDataTwo) {

    // clear old content  
    photoTwoEl.src = "";

    var randomNumberTwo = Math.floor(Math.random() * photoDataTwo.photos.length);

    // if the photo array is empty, run getMarsphotos again
    if (photoDataTwo.photos.length === 0) {
        getMarsPhotos();
    } // display the photos if they are available
    else {
        var photoTwo = photoDataTwo.photos[randomNumberTwo].img_src;
        photoTwoEl.src = photoTwo;
    };
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
            // console.log(today)
            fetch(today.properties.forecast)

                .then(r => r.json())
                .then(function (json) {
                    todayWeather = json
                    // console.log(todayWeather)
                    EarthCurrentWeather()
                    getMarsPhotos();
                    
                })
                
        })
        
}

function EarthCurrentWeather() {
    city.innerText = "City:" + " " + where.city.name + "," + ' ' + todayWeather.properties.periods[0].name + " " + '(' + moment().format('ll') + ')'
    temp.innerText = "temp:" + " " + todayWeather.properties.periods[0].temperature + "°F"
    wind.innerText = "wind speed:" + " " + todayWeather.properties.periods[0].windSpeed
    info.innerText = "forcast" + todayWeather.properties.periods[0].detailedForecast
    day1.innerText = "date:" + " " + todayWeather.properties.periods[2].name + " " + '(' + moment().add(1, 'days').format('ll') + ')'
    temp1.innerText = "temp:" + " " + todayWeather.properties.periods[2].temperature + "°F"
    wind1.innerText = "wind speed:" + " " + todayWeather.properties.periods[2].windSpeed
    day2.innerText = "date:" + " " + todayWeather.properties.periods[4].name + " " + '(' + moment().add(2, 'days').format('ll') + ')'
    temp2.innerText = "temp:" + " " + todayWeather.properties.periods[4].temperature + "°F"
    wind2.innerText = "wind speed:" + " " + todayWeather.properties.periods[4].windSpeed
    day3.innerText = "date:" + " " + todayWeather.properties.periods[6].name + " " + '(' + moment().add(3, 'days').format('ll') + ')'
    temp3.innerText = "temp:" + " " + todayWeather.properties.periods[6].temperature + "°F"
    wind3.innerText = "wind speed:" + " " + todayWeather.properties.periods[6].windSpeed
    day4.innerText = "date:" + " " + todayWeather.properties.periods[8].name + " " + '(' + moment().add(4, 'days').format('ll') + ')'
    temp4.innerText = "temp:" + " " + todayWeather.properties.periods[8].temperature + "°F"
    wind4.innerText = "wind speed:" + " " + todayWeather.properties.periods[8].windSpeed
    day5.innerText = "date:" + " " + todayWeather.properties.periods[10].name + " " + '(' + moment().add(5, 'days').format('ll') + ')'
    temp5.innerText = "temp:" + " " + todayWeather.properties.periods[10].temperature + "°F"
    wind5.innerText = "wind speed:" + " " + todayWeather.properties.periods[10].windSpeed
}

search.onclick = place;

//  local storage //

if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
} else {
    console.log("searchHistory loaded into searchHistoryArr");
    renderSearchHistory();
}

function renderSearchHistory(cityName) {
    searchHistoryEl.empty();
    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (var i = 0; i < searchHistoryArr.length; i++) {
        var newListItem = $("<li>").attr("class", "historyEntry");
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);
    }
    if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
        var searchHistoryArr = [];
        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
            searchHistoryArr.push(cityObj.cityName);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
        }}
    
};