// script.js

// OpenWeatherMap API Key
const API_KEY = 'your_api_key_here';

// Function to fetch weather data
async function fetchWeather(location) {
    try {
        // Fetch weather data from the API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Weather data not found.');
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Extract weather information
        const weather = {
            description: data.weather[0].description,
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        };
        
        // Update the weather display
        displayWeather(weather);
    } catch (error) {
        // Display error message
        document.getElementById('weatherDisplay').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Function to display weather information
function displayWeather(weather) {
    document.getElementById('weatherDisplay').innerHTML = `
        <h2>${weather.city}, ${weather.country}</h2>
        <img src="${weather.icon}" alt="${weather.description}">
        <p>${weather.description}</p>
        <p>Temperature: ${weather.temperature} &deg;C</p>
    `;
}

// Event listener for the button
document.getElementById('fetchWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

// Optionally, you can use geolocation API to get user's current location

