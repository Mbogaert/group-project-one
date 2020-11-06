var marsApiKey = "GrZ5XxlNbYcBVTrWcEVaRSagQlzo9TgtCbACgo64";
var photoOneEl = document.querySelector("#photoOne");
var photoTwoEl = document.querySelector("#photoTwo");


// call Mars Photo API
var getMarsPhotos = function(sol) {
    var sol = "999"; // eventually this will randomize a number between 1 - 1000
    var marsApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&api_key=" + marsApiKey;

    fetch(marsApiUrl).then(function (responseMarsPhoto) {
        responseMarsPhoto.json().then(function (photoData) {
            displayMarsPhotos(photoData);
        })
    })
};

// display Mars photo on the page (not yet randomized)
var displayMarsPhotos = function(photoData) {
    console.log(photoData);

    // clear old content
    photoOneEl.src = "";
    photoTwoEl.src = "";
};

getMarsPhotos();