var today = document.querySelector("#today");
var todayDate = document.querySelector("#todayDate");
var city = document.querySelector("#city");
var todayDegree = document.querySelector("#todayDegree");
var todayIcon = document.querySelector("#todayIcon");
var todayCondition = document.querySelector("#todayCondition");
var ratio = document.querySelector("#ratio");
var speed = document.querySelector("#speed");
var direction = document.querySelector("#direction");
var tomorrow = document.querySelector("#tomorrow");
var tomorrowIcon = document.querySelector("#tomorrowIcon");
var tomorrowDegree1 = document.querySelector("#tomorrowDegree1");
var tomorrowDegree2 = document.querySelector("#tomorrowDegree2");
var tomorrowCondition = document.querySelector("#tomorrowCondition");
var dayAfterTomorrow = document.querySelector("#dayAfterTomorrow");
var dayAfterTomorrowIcon = document.querySelector("#dayAfterTomorrowIcon");
var dayAfterTomorrowDegree1 = document.querySelector(
  "#dayAfterTomorrowDegree1"
);
var dayAfterTomorrowDegree2 = document.querySelector(
  "#dayAfterTomorrowDegree2"
);
var dayAfterTomorrowCondition = document.querySelector(
  "#dayAfterTomorrowCondition"
);
var search = document.querySelector("#search");
var btnSearch = document.querySelector("#btnSearch");

async function getData(cityName) {
  try {
    var url = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=88575b2246ce4895ab4163612241806`
    );
    var data = await url.json();
    displayCurrentDayWeather(data);
    displayTomorrowWeather(data);
    displayDayAfterTomorrowWeather(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayCurrentDayWeather(data) {
  var todayWeather = data.forecast.forecastday[0];
  var todayDateObj = new Date(todayWeather.date);
  var todayDay = todayDateObj.getDate();
  var todayWeek = todayDateObj.toLocaleString("en-us", { weekday: "long" });
  var todayMonth = todayDateObj.toLocaleString("en-us", { month: "long" });

  city.innerHTML = data.location.name;
  todayDate.innerHTML = ` ${todayMonth} ${todayDay}`;
  today.innerHTML = `${todayWeek}`;
  todayDegree.innerHTML = data.current.temp_c + "°C";
  todayIcon.innerHTML = `<img src="${data.current.condition.icon}" alt="">`;
  todayCondition.innerHTML = data.current.condition.text;
  ratio.innerHTML = `${
    '<i class="fa-solid fa-umbrella"></i> ' + data.current.humidity
  } %`;
  speed.innerHTML = `${
    '<i class="fa-solid fa-temperature-half"></i> ' + data.current.wind_kph
  } km/h`;
  direction.innerHTML = `${
    '<i class="fa-solid fa-gauge"></i> ' + data.current.wind_dir
  }`;
}

function displayTomorrowWeather(data) {
  var tomorrowWeather = data.forecast.forecastday[1];
  var tomorrowDateObj = new Date(tomorrowWeather.date);
  var tomorrowWeek = tomorrowDateObj.toLocaleString("en-us", {
    weekday: "long",
  });

  tomorrow.innerHTML = `${tomorrowWeek}`;
  tomorrowDegree1.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + "°C";
  tomorrowDegree2.innerHTML = data.forecast.forecastday[1].day.avgtemp_c + "°C";
  tomorrowIcon.innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="">`;
  tomorrowCondition.innerHTML = data.forecast.forecastday[1].day.condition.text;
}

function displayDayAfterTomorrowWeather(data) {
  var dayAfterTomorrowWeather = data.forecast.forecastday[2];
  var dayAfterTomorrowDateObj = new Date(dayAfterTomorrowWeather.date);
  var dayAfterTomorrowWeek = dayAfterTomorrowDateObj.toLocaleString("en-us", {
    weekday: "long",
  });

  dayAfterTomorrow.innerHTML = `${dayAfterTomorrowWeek}`;
  dayAfterTomorrowDegree1.innerHTML =
    data.forecast.forecastday[2].day.maxtemp_c + "°C";
  dayAfterTomorrowDegree2.innerHTML =
    data.forecast.forecastday[2].day.avgtemp_c + "°C";
  dayAfterTomorrowIcon.innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="">`;
  dayAfterTomorrowCondition.innerHTML =
    data.forecast.forecastday[2].day.condition.text;
}

btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  var cityName = search.value.trim();
  if (cityName) {
    getData(cityName);
  } else {
    alert("Please enter a city name.");
  }
});

btnSearch.addEventListener("Enter", function (e) {
  e.preventDefault();
  var cityName = search.value.trim();
  if (cityName) {
    getData(cityName);
  } else {
    alert("Please enter a city name.");
  }
});

// Check if the browser supports geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var coordinates = `${latitude},${longitude}`;
    getData(coordinates);
  });
} else {
  getData("cairo");
}
