const cityName = document.querySelector(".city");
const cityTemp = document.querySelector(".temp");
const cityHumidity = document.querySelector(".humidity");
const cityWindSpeed = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");

const apiKey = "3d33e4ed26a2b9682a75a8b43182c425";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  console.log(response);
  if (response.ok === false) {
    errorMsg.style.display = "block";
    weatherSection.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);

    cityName.innerText = data.name;
    cityTemp.innerText = `${Math.trunc(data.main.temp)}°c`; // we can use parseInt() or Math.round() method also.
    cityHumidity.innerText = `${data.main.humidity}%`;
    cityWindSpeed.innerText = `${data.wind.speed} km/h`;

    if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    weatherSection.style.display = "block";
    errorMsg.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
