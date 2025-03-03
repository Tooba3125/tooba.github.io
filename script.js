const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) {
    alert("Please enter a city.");
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "*C";
    document.querySelector(".humidity").innerHTML = data.wind.speed + " km/h";

    // Set weather icon based on weather condition
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "img/mist.png";
    }

    // Show weather details
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

