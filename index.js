const apiKey = "030c1200e4bac6f69d26fdc220092ba2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather.icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "https://i.pinimg.com/236x/77/c1/56/77c156b0888f37b0d75f552eebd9f5ef.jpg";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "https://i.pinimg.com/236x/35/a4/9f/35a49f896bbef9bc2494e57f9e4d0667.jpg";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "https://i.pinimg.com/236x/42/30/39/4230394c441d1f6a4137c7a434580ad4.jpg";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "https://i.pinimg.com/236x/9b/1b/90/9b1b90a70bc21130e409473b05769b3a.jpg";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "https://i.pinimg.com/236x/85/68/9f/85689f2b05e5a2319035896c1a79a39f.jpg";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Trigger search on button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Trigger search on Enter key press
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
