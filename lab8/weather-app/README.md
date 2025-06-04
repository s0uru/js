# Weather Application

A simple weather application that displays current weather information for user-specified locations using the OpenWeatherMap API. The app remembers up to ten recently searched locations using localStorage.

## Features

- Display current weather information including:
  - Temperature (°C)
  - Humidity (%)
  - Weather description
  - Weather icon
- Save up to ten locations in localStorage
- Clean, responsive user interface
- Error handling for invalid city names

## Project Structure


```
weather-app/
├── public/
│ └── index.html # Main HTML file
├── src/
│ ├── api.js # Functions to fetch weather data from OpenWeatherMap
│ ├── storage.js # LocalStorage management for saved locations
│ ├── script.js # Main application logic and event handlers
│ ├── ui.js # User interface rendering functions
│ └── styles/
│ └── style.css # Application styles
├── package.json # npm configuration file
└── README.md # Project documentation
```


## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone [your-repository-url]
   cd weather-app

## Usage

- Enter a city name in the input field to fetch the weather data.
- Click the "Add Location" button to save the city to your list.
- The application will remember your last ten locations for future access.

## API Key

To use the OpenWeatherMap API, you will need to sign up for an API key. Replace the placeholder in `src/api.js` with your actual API key.

## License

This project is open-source and available under the MIT License.