const apiKey = "a6c02a6319e674e972890fbcc87910b3";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();

        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const feelsLike = `${Math.floor(data.main.feels_like)}°C`;
        const humidity = `${data.main.humidity}%`;
        const windSpeed = `${data.wind.speed} m/s`;
        const coordinates = `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`;

        const now = new Date();
        const dateTime = now.toLocaleString();

        weatherDataEle.style.display = "flex";
        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataEle.querySelector(".desc").textContent = description;
        weatherDataEle.querySelector(".date-time").textContent = dateTime;

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;

        document.getElementById("feels-like").textContent = feelsLike;
        document.getElementById("humidity").textContent = humidity;
        document.getElementById("wind-speed").textContent = windSpeed;
        document.getElementById("coordinates").textContent = coordinates;

    } catch (err) {
        weatherDataEle.style.display = "flex";
        imgIcon.innerHTML = "";
        weatherDataEle.querySelector(".temp").textContent = "";
        weatherDataEle.querySelector(".date-time").textContent = "";
        weatherDataEle.querySelector(".desc").textContent = err.message;
        document.querySelector(".details").style.display = "none";
    }
}