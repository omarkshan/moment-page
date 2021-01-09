const apiLink = "https://api.covid19api.com/world/total";

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function getResult(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let n1 = document.getElementById("total-confirmed");
      animateValue(n1, 0, data.TotalConfirmed, 3000);
      let n2 = document.getElementById("total-deaths");
      animateValue(n2, 0, data.TotalDeaths, 3000);
      let n3 = document.getElementById("total-recovered");
      animateValue(n3, 0, data.TotalRecovered, 3000);
      console.log("Info updated");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateResult(url) {
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let n1 = (document.getElementById(
        "total-confirmed"
      ) = data.TotalConfirmed);
      let n2 = (document.getElementById("total-deaths") = data.TotalDeaths);
      let n3 = (document.getElementById(
        "total-recovered"
      ) = data.TotalRecovered);
      console.log("Info updated");
    })
    .catch((err) => {
      console.log(err);
    });
  // setTimeout(updateResult(url), 5000);
}
// 
getResult(apiLink);
