document.addEventListener("DOMContentLoaded", function() {
    const cityInput = document.querySelector(".city-input");
    const searchButton = document.querySelector(".search-btn");
    const locationButton = document.querySelector(".location-btn");
    const currentWeatherDiv = document.querySelector(".current-weather");
    const weatherCardsDiv = document.querySelector(".weather-cards");
    const highlightsDiv = document.querySelector(".highlights");
    const API_KEY = "36b3334a5c375bf53111d6c7ffa5ddd2";

    const createHighlightsCard = function(weatherItem){
        return `<h3 class="mb-4">Today's Highlights</h3>
                        <div class="card mb-4">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Max Temp </h6>
                                    <p class="card-text"><span>${(weatherItem.main.temp_max-273.15).toFixed(2)} °C</span></p>
                                </div>
                                <div class="svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-thermometer-high" viewBox="0 0 16 16">
                                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415"/>
                                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                                      </svg>
                                </div>
                            </div>                        
                        </div>
                        <div class="card mb-4">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Min Temp </h6>
                                    <p class="card-text"><span>${(weatherItem.main.temp_min-273.15).toFixed(2)} °C</span></p>
                                </div>
                                <div class="svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-thermometer-low" viewBox="0 0 16 16">
                                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415"/>
                                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                                      </svg>
                                </div>
                            </div>                        
                        </div>
                        <div class="card mb-4">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Wind </h6>
                                    <p class="card-text"><span>${weatherItem.wind.speed} M/S</span></p>
                                </div>
                                <div class="svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Humidity </h6>
                                    <p class="card-text"><span>${weatherItem.main.humidity} %</span></p>
                                </div>
                                <div class="svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-umbrella" viewBox="0 0 16 16">
                                        <path d="M8 0a.5.5 0 0 1 .5.5v.514C12.625 1.238 16 4.22 16 8c0 0 0 .5-.5.5-.149 0-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394A3.17 3.17 0 0 0 13 7.5c-.638 0-1.178.213-1.564.434a3.5 3.5 0 0 0-.555.394l-.025.023-.003.003s-.204.146-.353.146-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394 3.3 3.3 0 0 0-1.064-.39V13.5H8h.5v.039l-.005.083a3 3 0 0 1-.298 1.102 2.26 2.26 0 0 1-.763.88C7.06 15.851 6.587 16 6 16s-1.061-.148-1.434-.396a2.26 2.26 0 0 1-.763-.88 3 3 0 0 1-.302-1.185v-.025l-.001-.009v-.003s0-.002.5-.002h-.5V13a.5.5 0 0 1 1 0v.506l.003.044a2 2 0 0 0 .195.726c.095.191.23.367.423.495.19.127.466.229.879.229s.689-.102.879-.229c.193-.128.328-.304.424-.495a2 2 0 0 0 .197-.77V7.544a3.3 3.3 0 0 0-1.064.39 3.5 3.5 0 0 0-.58.417l-.004.004S5.65 8.5 5.5 8.5s-.352-.145-.352-.145l-.004-.004a3.5 3.5 0 0 0-.58-.417A3.17 3.17 0 0 0 3 7.5c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.58.417l-.004.004S.65 8.5.5 8.5C0 8.5 0 8 0 8c0-3.78 3.375-6.762 7.5-6.986V.5A.5.5 0 0 1 8 0M6.577 2.123c-2.833.5-4.99 2.458-5.474 4.854A4.1 4.1 0 0 1 3 6.5c.806 0 1.48.25 1.962.511a9.7 9.7 0 0 1 .344-2.358c.242-.868.64-1.765 1.271-2.53m-.615 4.93A4.16 4.16 0 0 1 8 6.5a4.16 4.16 0 0 1 2.038.553 8.7 8.7 0 0 0-.307-2.13C9.434 3.858 8.898 2.83 8 2.117c-.898.712-1.434 1.74-1.731 2.804a8.7 8.7 0 0 0-.307 2.131zm3.46-4.93c.631.765 1.03 1.662 1.272 2.53.233.833.328 1.66.344 2.358A4.14 4.14 0 0 1 13 6.5c.77 0 1.42.23 1.897.477-.484-2.396-2.641-4.355-5.474-4.854z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body d-flex justify-content-between">
                                <div>
                                    <h6 class="card-title">Pressure </h6>
                                    <p class="card-text"><span>${weatherItem.main.pressure} hPa</span></p>
                                </div>
                                <div class="svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
                                        <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                                        <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body d-flex justify-content-between">
                                <div>
                                    <h6 class="card-title">Feels Like </h6>
                                    <p class="card-text"><span>${(weatherItem.main.feels_like-273.15).toFixed(2)} °C</span></p>
                                </div>
                                <div class="svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-thermometer" viewBox="0 0 16 16">
                                        <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                        <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>`
    }



    // Creating the weather cards
    const createWeatherCard = function(cityName, weatherItem, i) {
        if (i === 0) {
            return `<div class="container">
                        <div class="row">
                            <div class="details col-12 col-md-9">
                                <h2>${cityName} -${weatherItem.dt_txt.split(" ")[0]}</h2>
                                <h5>Temperature: <span>${(weatherItem.main.temp - 273.15).toFixed(2)} °C</span></h5>
                                <h5>Wind: <span>${weatherItem.wind.speed} M/S</span></h5>
                                <h5>Humidity: <span>${weatherItem.main.humidity} %</span></h5>
                            </div>
                            <div class="weather-image col-12 col-lg-3">
                                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="current-weather-image">
                            </div>
                        </div>
                    </div>`;
        } else if (i < 5) {
            return `<div class="col-md-6 col-sm-12 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 col-lg-7">
                                            <h4>${weatherItem.dt_txt.split(" ")[0]}</h4>
                                        </div>
                                        <div class="weather-image col-12 col-lg-5">
                                            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="current-weather-image">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 mb-2">
                                        <div class="card small-card">
                                            <div class="card-body">
                                                <h6 class="card-title">Temperature</h6>
                                                <p class="card-text"><span>${(weatherItem.main.temp - 273.15).toFixed(2)} °C<span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="card small-card">
                                            <div class="card-body">
                                                <h6 class="card-title">Wind</h6>
                                                    <p class="card-text"><span>${weatherItem.wind.speed} M/S</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="card small-card">
                                            <div class="card-body">
                                                <h6 class="card-title">Humidity</h6>
                                                <p class="card-text"><span>${weatherItem.main.humidity}%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    };

    // Function for getting weather details
    const getWeatherDetails = function(cityName, lat, lon) {
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        // API call
        fetch(WEATHER_API_URL)
            .then(res => res.json())
            .then(data => {
                // Filtering the API data to get only one forecast per day
                const uniqueDays = [];
                const reqData = data.list.filter(forecast => {
                    const forecastDate = new Date(forecast.dt_txt).getDate();
                    if (!uniqueDays.includes(forecastDate)) {
                        return uniqueDays.push(forecastDate);
                    }
                });
                console.log(reqData);
                // Display the current weather and forecast
                currentWeatherDiv.innerHTML = createWeatherCard(cityName, reqData[0], 0);
                weatherCardsDiv.innerHTML = reqData.slice(1, 5).map((item, index) => createWeatherCard(cityName, item, index + 1)).join('');
                highlightsDiv.innerHTML = createHighlightsCard(reqData[0]);
            })
            .catch(() => {
                alert("An error occurred while fetching the weather updates");
            });
    };

    // Function for getting city coordinates
    const getCityCoordinates = function(event) {
        event.preventDefault(); // Prevent form submission
        const cityName = cityInput.value.trim();
        if (!cityName) return;
        const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
        // API call
        fetch(GEOCODING_API_URL)
            .then(res => res.json())
            .then(data => {
                if (!data.length) return alert(`No coordinates found for ${cityName}`);
                const { name, lat, lon } = data[0];
                getWeatherDetails(name, lat, lon);
            })
            .catch(() => {
                alert("An error occurred while fetching the coordinates");
            });
    };

    const form = document.querySelector("#city-form");
    form.addEventListener("submit", getCityCoordinates);

    locationButton.addEventListener("click", function() {
        // Implement functionality for using current location
        navigator.geolocation.getCurrentPosition(
            position=>{
                const {latitude,longitude} = position.coords;
                const REVERSE_GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
                fetch(REVERSE_GEOCODING_API_URL)
                .then(res => res.json())
                .then(data => {
                    const cityName=data[0].name;
                    getWeatherDetails(cityName, latitude, longitude);
                })
                .catch(() => {
                    alert("An error occurred while fetching the city");
                });
            },  
            error=>{
                if(error.code=== error.PERMISSION_DENIED){
                    alert("Geolocation request denied. Please reset location permission in your settings");
                }
            }
        )
    });
});
