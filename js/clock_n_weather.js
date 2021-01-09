// DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus");

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12HR Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)}<br>${amPm}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Set Background and Greeting
function setBackground() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.getElementById("greeting").innerHTML = "Morning";
    document.body.style.backgroundImage = "url('./images/dawn.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  } else if (hour < 18) {
    // Afternoon
    document.getElementById("greeting").innerHTML = "Afternoon";
    document.body.style.backgroundImage = "url('./images/morning.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  } else {
    //Evening
    document.getElementById("greeting").innerHTML = "Evening";
    document.body.style.backgroundImage = "url('./images/night.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }
}

function fetchQuote() {
  var r = Math.floor(Math.random() * 50);
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("quote").innerHTML = data[r].text;
      document.getElementById("author").innerHTML = data[r].author;
    });
}

// Get Name
function getName() {
  if (localStorage.getItem("firstName") === null)
    firstName.textContent = "[Enter Name]";
  else firstName.textContent = localStorage.getItem("firstName");
}

// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("firstName", e.target.innerText);
      firstName.blur();
    }
  } else {
    localStorage.setItem("firstName", e.target.innerText);
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("foucs", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem("focus") === null)
    focus.textContent = "[Enter Focus]";
  else focus.textContent = localStorage.getItem("focus");
}

firstName.addEventListener("keypress", setName);
firstName.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var apiKey = "b5ec6fb7c0e9aec81490c109689934af";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude.toFixed()}&lon=${position.coords.longitude.toFixed()}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("temp").innerHTML = Math.round(
        data.main.temp - 270
      );
      document.getElementById("max-temp").innerHTML = Math.ceil(
        data.main.temp_max - 270
      );
      document.getElementById("min-temp").innerHTML = Math.floor(
        data.main.temp_min - 270
      );
      document.getElementById("feels-temp").innerHTML = Math.floor(
        data.main.feels_like - 270
      );
      document.getElementById("weather-status").innerHTML =
        data.weather[0].main;
      document.getElementById("country").innerHTML = data.sys.country;
      document.getElementById("loc").innerHTML = data.name;

      if (data.weather[0].main == "Fog")
        document.getElementById("icon").className = "fas fa-smog";
      else if (data.weather[0].main == "Sunny" || data.weather[0].main == "Sun")
        document.getElementById("icon").className = "fas fa-sun";
      else if (
        data.weather[0].main == "Rainy" ||
        data.weather[0].main == "Rain"
      )
        document.getElementById("icon").className = "fas fa-cloud-rain";
      else
        document.getElementById("icon").className = "fas fa-thermometer-half";
    })
    .catch((err) => {
      console.log(err);
    });

  setTimeout(getLocation, 1000 * 60 * 60);
}

// Run
showTime();
// Set Video
setBackground();
// Fetch Quote
fetchQuote();
getName();
getFocus();

getLocation();
