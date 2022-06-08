const baseUrl = "https://openweathermap.org/data/2.5/find";
const apiKey = "439d4b804bc8187953eb36d2a8c26a02";

const form = document.getElementById("weather-form");
const goBackBtn = document.getElementById("go-back-button");
const weatherBody = document.getElementById("weather-body");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const location = document.querySelectorAll('[name="location"]')[0].value;
  getData(location);
});

goBackBtn.addEventListener("click", function (event) {
  weatherBody.style.display = "none";
  form.style.display = "flex";
  goBackBtn.style.display = "none";
});

async function getData(location) {
  const options = {
    method: "GET",
  };
  fetch(`${baseUrl}?q=${location}&appid=${apiKey}`, options)
    .then((response) => response.json())
    .then((response) => {
      weatherBody.style.display = "block";
      form.style.display = "none";
      goBackBtn.style.display = "block";
      weatherBody.innerHTML = "";
      if (response.list.length != 0) {
        response.list.forEach((res) => {
          const weatherCard = document.createElement("div");
          weatherCard.classList.add("weather-card");
          weatherCard.innerHTML = `
                <div class="weather-card-city">${res.name}, ${
            res.sys.country
          }</div>
                <div class="weather-card-description">
                    <div class="weather-card-description-temp">
                        <div>${getTemp(res.main.temp)}&deg;C</div>
                        <img src='https://openweathermap.org/img/w/${
                          res.weather[0].icon
                        }.png' alt='${res.weather[0].main}' width='80' />
                    </div>
                    <div class="weather-card-description-weather">${
                      res.weather[0].description
                    }</div>
                </div>
                <div class="weather-card-detail">
                    <div>Feels like: ${getTemp(res.main.feels_like)}&deg;C</div>
                    <div>Pressure: ${res.main.pressure}hPa</div>
                    <div>Humidity: ${res.main.humidity}%</div>
                </div>
            `;
          weatherBody.appendChild(weatherCard);
        });
      } else {
        const noContent = document.createElement("div");
        noContent.classList.add("no-content");
        noContent.innerHTML = "Nothing found";
        weatherBody.appendChild(noContent);
      }
    });
}

function getTemp(temp) {
  return Math.round(temp - 273.15);
}
