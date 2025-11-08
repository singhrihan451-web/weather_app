const apiKey = "239e79dcd30548bb90442011250811";
const apiUrl = "http://api.weatherapi.com/v1/current.json";

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const weatherBox = document.getElementById("weatherResult");

  if (!location) {
    errorMsg.textContent = "Please enter a city name.";
    errorMsg.classList.remove("hidden");
    weatherBox.classList.add("hidden");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}&aqi=yes`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temperature").textContent = `🌡 Temperature: ${data.current.temp_c}°C`;
    document.getElementById("condition").textContent = `☁ Condition: ${data.current.condition.text}`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${data.current.humidity}%`;
    document.getElementById("wind").textContent = `💨 Wind: ${data.current.wind_kph} km/h`;
    document.getElementById("weatherIcon").src = `https:${data.current.condition.icon}`;

    const isDay = data.current.is_day === 1;
    changeBackground(data.current.condition.text, isDay);

    weatherBox.classList.remove("hidden");
    weatherBox.classList.add("show");
    errorMsg.classList.add("hidden");
  } catch (error) {
    errorMsg.textContent = "City not found. Please try again!";
    errorMsg.classList.remove("hidden");
    weatherBox.classList.add("hidden");
  }
}

function changeBackground(condition, isDay) {
  const body = document.body;
  let imageUrl = "";
  condition = condition.toLowerCase();

  if (condition.includes("sunny") || condition.includes("clear")) {
    imageUrl = isDay
      ? "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1470&q=80"
      : "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80";
  } else if (condition.includes("cloud")) {
    imageUrl = isDay
      ? "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1470&q=80"
      : "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1470&q=80";
  } else if (condition.includes("rain")) {
    imageUrl = isDay
      ? "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1470&q=80"
      : "https://images.unsplash.com/photo-1526676037281-88ad6b1a4c05?auto=format&fit=crop&w=1470&q=80";
  } else if (condition.includes("snow")) {
    imageUrl = isDay
      ? "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1470&q=80"
      : "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1470&q=80";
  } else if (condition.includes("thunder") || condition.includes("storm")) {
    imageUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80";
  } else if (condition.includes("fog") || condition.includes("mist") || condition.includes("haze")) {
    imageUrl = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1470&q=80";
  } else {
    imageUrl = "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80";
  }

  body.style.background = `url('${imageUrl}') no-repeat center center/cover`;
  body.style.transition = "background 1s ease-in-out";
  body.style.setProperty("--overlay-color", isDay ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.55)");
}
