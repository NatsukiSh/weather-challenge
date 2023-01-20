navigator.geolocation.getCurrentPosition(onSucess, onError);

function onSucess(data) {
  console.log(data);
  const lat = data.coords.latitude;
  const lon = data.coords.longitude;
  const apiKey = "28feed74ca8e6f8450fa975c80fe27e3";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function onError(error) {
  console.log(error);
}
