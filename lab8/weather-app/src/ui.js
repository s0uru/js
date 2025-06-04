export function renderWeather(data) {
  const container = document.getElementById('weather-container');
  container.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind speed: ${data.wind.speed} m/s</p>
  `;
}
