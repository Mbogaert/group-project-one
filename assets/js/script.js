var marsApiKey = "GrZ5XxlNbYcBVTrWcEVaRSagQlzo9TgtCbACgo64";
var photoOneEl = document.querySelector("#photoOne");
var photoTwoEl = document.querySelector("#photoTwo");

// TBD 
// display two photos - split the array?
// randomize the display of the two photos


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

    // clear old content - so that with each run of the application new images are generated
    photoOneEl.src = "";
    photoTwoEl.src = "";

    // var randomNumber = Math.floor(Math.random() * 280);
    // console.log(randomNumber);

    var photoOne = photoData[0].img_src
    console.log(photoOne);
    // set photoOne and photoTwo name
    // set photo container to display the mars image
};

getMarsPhotos();