import { getWeatherByCity } from './api.js';
import { saveCityToLocalStorage, getCityFromLocalStorage } from './storage.js';
import { renderWeather } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const cityInput = document.getElementById('city-input');

  const savedCity = getCityFromLocalStorage();
  if (savedCity) {
    fetchAndRenderWeather(savedCity);
  }

  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      saveCityToLocalStorage(city);
      fetchAndRenderWeather(city);
    }
  });
});

async function fetchAndRenderWeather(city) {
  try {
    const weather = await getWeatherByCity(city);
    renderWeather(weather);
  } catch (error) {
    console.error(error);
    document.getElementById('weather-container').innerHTML = '<p>Failed to fetch weather data.</p>';
  }
}
