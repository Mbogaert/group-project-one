var marsWeather = function (data) {
    fetch("https://api.nasa.gov/insight_weather/?api_key=hdDA40aPdgSZVa0DcosEmZnQQkI5lopMehUWoxoq&feedtype=json&ver=1.0")
    .then(r => r.json(data))
    .then(function(data) {
        console.log(data);
    })
    $

}

marsWeather();