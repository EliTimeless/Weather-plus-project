let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let dayMonth = date.getDate();
  let month = months[date.getMonth()];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = dayNames[date.getDay()];
  return `${day} ${hours}:${minutes} ${month} ${dayMonth}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row text-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
              <div class="day" id="day-forecast">${formatDay(
                forecastDay.dt
              )}</div>
              <span class="temp-max" id="max-forecast">${Math.round(
                forecastDay.temp.max
              )} ºC </span>/<span
                class="temp-min"
                id="min-forecast"
                >${Math.round(forecastDay.temp.min)} ºC</span
              >
              <div class="speed" id="wind-forecast">
                <i class="fa-solid fa-wind"></i>${Math.round(
                  forecastDay.wind_speed
                )} km/h) 
              </div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="clear"
                id="icon"
                class="forecast-days"
              />
              </div>
            `;
    } else {
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  apiKey = `8ca7dd4e61360b90fb66918853670e48`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let tempAssign = document.querySelector("#temperature");
  tempAssign.innerHTML = temperature;

  let wind = Math.round(response.data.wind.speed);
  let windAssign = document.querySelector("#wind");
  windAssign.innerHTML = `${wind} km/h`;

  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let highLow = document.querySelector("#high-low");
  highLow.innerHTML = `${high}ºC high | ${low}ºC low`;

  let clouds = response.data.weather[0].description;
  let sky = document.querySelector("#clouds");
  sky.innerHTML = clouds;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let humidity = response.data.main.humidity;
  let humidAssign = document.querySelector("#humidity");
  humidAssign.innerHTML = `humidity ${humidity} %`;

  let dateElement = document.querySelector("#curr-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  function convertToFar(event) {
    event.preventDefault();
    let farhTemp = Math.round(response.data.main.temp * 1.8 + 32);
    let assignFar = document.querySelector("#temperature");
    assignFar.innerHTML = farhTemp;
  }
  let convertCtoF = document.querySelector("#farhenheit");
  convertCtoF.addEventListener("click", convertToFar);

  function convertToCelsius(event) {
    event.preventDefault();
    let farhTemp = Math.round(response.data.main.temp);
    let assignFar = document.querySelector("#temperature");
    assignFar.innerHTML = farhTemp;
  }

  let convertFtoC = document.querySelector("#celsius");
  convertFtoC.addEventListener("click", convertToCelsius);

  getForecast(response.data.coord);
}

function clickSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let key = `8ca7dd4e61360b90fb66918853670e48`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(url).then(searchTemperature);
}

let key = `8ca7dd4e61360b90fb66918853670e48`;

let form = document.querySelector("#search-form");

form.addEventListener("submit", clickSubmit);

searchCity("Prague");
