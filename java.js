let now = new Date();
let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday",
];
let time = document.querySelector(".time");
let week = weeks[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${week} ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  let city = searchinput.value;
  h1.innerHTML = city;
  let apikey = "f02bf8b085f29f8504d48daf88ff0017";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  function showtemperature(response) {
    let temp = Math.round(response.data.main.temp);
    let temperatureelement = document.querySelector("#degrees");
    temperatureelement.innerHTML = temp;
  }
  function showweather(response) {
    let typeweather = document.querySelector(".typeweather");
    typeweather.innerHTML = response.data.weather[0].main;
  }
  function showfeeling(response) {
    let feel = Math.round(response.data.main.feels_like);
    let feellike = document.querySelector(".feellike");
    feellike.innerHTML = feel;
  }
  function showhumi(response) {
    let humi = Math.round(response.data.main.humidity);
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = humi;
  }
  function showwind(response) {
    let wind = Math.round(response.data.wind.speed);
    let windy = document.querySelector(".wind");
    windy.innerHTML = wind;
  }

  axios.get(apiurl).then(showtemperature);
  axios.get(apiurl).then(showweather);
  axios.get(apiurl).then(showfeeling);
  axios.get(apiurl).then(showhumi);
  axios.get(apiurl).then(showwind);
}
let form = document.querySelector("#forms");
form.addEventListener("submit", search);

function ser(event) {
  event.preventDefault();
  let celsiusetemp = document.querySelector("#degrees");
  celsiusetemp.innerHTML = temp;
}
let degrees = document.querySelector("#celsius");
degrees.addEventListener("click", ser);

function currenttemp(response) {
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;
  let temper = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degrees");
  degree.innerHTML = temper;
}
function relativeposition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apikey = "f02bf8b085f29f8504d48daf88ff0017";
  let urlkey = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
  axios.get(urlkey).then(currenttemp);
}

function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(relativeposition);
}
let forms = document.querySelector("#forms");
forms.addEventListener("submit", current);
