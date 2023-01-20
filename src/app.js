const htmlElement = document.documentElement;
const weatherIcon = document.querySelector(".weather-icon");
const weatherLocation = document.querySelector(".weather-loaction");
const weatherTemperature = document.querySelector(".weather-temperature");
const descriptionElement = document.querySelector(".description");

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError(error) {
  weatherLocation.innerText = `You must permit your browser to access your current location`;
  console.log(error);
}

function onSuccess(data) {
  console.log(data);
  const lat = data.coords.latitude;
  const lon = data.coords.longitude;
  const apiKey = "28feed74ca8e6f8450fa975c80fe27e3";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const locationName = data.name;
      const temp = Math.floor(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      weatherIcon.alt = description;
      weatherIcon.src = `img/${iconCode}.png`;
      weatherLocation.innerText = locationName;
      weatherTemperature.innerText = `${temp}°`;

      descriptionElement.innerText = getDescription(iconCode);

      htmlElement.classList.remove("js-loading");
    });
}

const descriptions = {
  "01d": "Remember to apply suncream!",
  "01n": "Good night!",
  "02d": "Variable...",
  "02n": "Beware werewolves...",
  "03d": "Perfect lighting for photos!",
  "03n": "Sleep well :)",
  "04d": "Today: a case of the classic British overcast sky :)",
  "04n": "So cloudy, you won't even see the moon!",
  "09d": "You might need a brolly.",
  "09n": "Cover up well today",
  "10d": "You'll need two umbrellas",
  "10n": "Don't expose bare skin to the sun!",
  "11d": "Wear rubber boots!",
  "11n": "Might be one or two sparks in the sky",
  "13d": "Weather for snow-men and snow-angels.",
  "13n": "Perfect night to be under the stars outside!",
  "50d": "Fog lights should be on!",
  "50n": "Drive carefully!",
};

function getDescription(iconCode) {
  return descriptions[iconCode];
}
