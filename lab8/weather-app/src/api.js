const API_KEY = '1ce41e52de06e60c1c878d40099edc42';

export async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Weather data not found');
  }
  const data = await response.json();
  return data;
}
