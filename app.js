document.getElementById('fetchWeather').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    if (location) {
        try {
            const response = await fetch(`https://weatherapifunc.azurewebsites.net/api/weather_func?location=${location}`);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            alert('Error fetching weather data');
        }
    } else {
        alert('Please enter a location');
    }
});

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data) {
        weatherDisplay.innerHTML = `
            <h2>Weather in ${data.city}</h2>
            <p>Temperature: ${data.temperature}°C</p>
            <p>Description: ${data.description}</p>
        `;
    } else {
        weatherDisplay.innerHTML = 'No data available';
    }
}
