var marsApiKey = "GrZ5XxlNbYcBVTrWcEVaRSagQlzo9TgtCbACgo64";
var photoOneEl = document.querySelector("#photoOne");
var photoTwoEl = document.querySelector("#photoTwo");

// TBD 
// add another camera/API to the other photo
// photo sizing hmmm...
// check to make sure the array exists function - if it doesn't run getMarsPhotos again
// figure out what image should be displayed on landing on the page - if any


// call Mars Photo API
var getMarsPhotos = function(sol) {
    var sol = 10 + Math.floor(Math.random() * (1000 - 10 + 1)); // eventually this will randomize a number between 10 - 1000
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

    // clear old content - so that with each run of the application new images are generated
    photoOneEl.src = "";
    photoTwoEl.src = "";

    var randomNumber = Math.floor(Math.random() * photoData.photos.length);
    var randomNumberTwo = Math.floor(Math.random() * photoData.photos.length);

    var photoOne = photoData.photos[randomNumber].img_src;
    photoOneEl.src = photoOne;

    var photoTwo = photoData.photos[randomNumberTwo].img_src;
    photoTwoEl.src = photoTwo;
};

getMarsPhotos();