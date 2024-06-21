// Select elements from the DOM
var search = document.querySelector("#search");
var btnSearch = document.querySelector("#btnSearch");
var row = document.querySelector("#row");
var box = "";

// Function to fetch weather data based on city name or coordinates
async function getData(cityName) {
  try {
    var url = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=88575b2246ce4895ab4163612241806`
    );
    var data = await url.json();
    displayFun(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display the weather data
function displayFun(data) {
  var todayWeather = data.forecast.forecastday[0];
  var todayDateObj = new Date(todayWeather.date);
  var todayDay = todayDateObj.getDate();
  var todayWeek = todayDateObj.toLocaleString("en-us", { weekday: "long" });
  var todayMonth = todayDateObj.toLocaleString("en-us", { month: "long" });

  var tomorrowWeather = data.forecast.forecastday[1];
  var tomorrowDateObj = new Date(tomorrowWeather.date);
  var tomorrowWeek = tomorrowDateObj.toLocaleString("en-us", {
    weekday: "long",
  });

  var dayAfterTomorrowWeather = data.forecast.forecastday[2];
  var dayAfterTomorrowDateObj = new Date(dayAfterTomorrowWeather.date);
  var dayAfterTomorrowWeek = dayAfterTomorrowDateObj.toLocaleString("en-us", {
    weekday: "long",
  });

  box = `<div class="col-md-4">
                    <div class="card text-white">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span>${todayWeek}</span>
                            <span>${todayMonth} ${todayDay}</span>
                        </div>
                        <div class="card-body">
                            <p>${data.location.name}, ${
    data.location.region
  }, ${data.location.country}</p>
                            <p class="display-1 fw-bold">${
                              data.current.temp_c + "°C"
                            }</p>
                            <i class="display-3"><img src="${
                              data.current.condition.icon
                            }" alt=""></i>
                            <span class="d-block weather-condition">${
                              data.current.condition.text
                            }</span>
                            <div class="weather-info d-flex gap-5 mt-3">
                                <p> ${
                                  '<i class="fa-solid fa-umbrella"></i> ' +
                                  data.current.humidity
                                } % </p>
                                <p> ${
                                  '<i class="fa-solid fa-temperature-half"></i> ' +
                                  data.current.wind_kph
                                } km/h</p>
                                <p> ${
                                  '<i class="fa-solid fa-gauge"></i> ' +
                                  data.current.wind_dir
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-white">
                        <div class="card-header card2-header d-flex justify-content-center align-items-center">
                            <span>${tomorrowWeek}</span>
                        </div>
                        <div
                            class="card-body card2-body d-flex justify-content-center align-items-center flex-column gap-4">
                            <i id="tomorrowIcon"> <img src="${
                              data.forecast.forecastday[1].day.condition.icon
                            }" alt=""></i>
                            <p class="display-1 fw-bold">${
                              data.forecast.forecastday[1].day.maxtemp_c + "°C"
                            }</p>
                            <p>${
                              data.forecast.forecastday[1].day.avgtemp_c + "°C"
                            }</p>
                            <span class="d-block weather-condition" id="tomorrowCondition">${
                              data.forecast.forecastday[1].day.condition.text
                            }</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-white">
                        <div class="card-header d-flex justify-content-center align-items-center">
                            <span>${dayAfterTomorrowWeek}</span>
                        </div>
                        <div class="card-body d-flex justify-content-center align-items-center flex-column gap-4">
                            <i> <img src="${
                              data.forecast.forecastday[2].day.condition.icon
                            }" alt=""></i>
                            <p class="display-1 fw-bold">${
                              data.forecast.forecastday[2].day.maxtemp_c + "°C"
                            }</p>
                            <p>${
                              data.forecast.forecastday[2].day.avgtemp_c + "°C"
                            }</p>
                            <span class="d-block weather-condition">${
                              data.forecast.forecastday[2].day.condition.text
                            }</span>
                        </div>
                    </div>
                </div>`;

  row.innerHTML = box;
}

// Add event listener to the search button
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  searchFun();
});

// Add event listener to handle Enter key press
btnSearch.addEventListener("Enter", function (e) {
  e.preventDefault();
  searchFun();
});

// Function to handle search logic
function searchFun() {
  var cityName = search.value.trim();
  if (cityName) {
    getData(cityName);
  } else {
    alert("Please enter a city name.");
  }
}

// Check if the browser supports geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // Success callback
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var coordinates = `${latitude},${longitude}`;
      getData(coordinates);
    },
    function (error) {
      // Error callback
      console.error("Error getting location: ", error);
      getData("cairo");
    }
  );
} else {
  // Geolocation not supported
  getData("cairo");
}
