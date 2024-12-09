document.getElementById('fetchWeather').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    if (location) {
        try {
            const response = await fetch(`https://weatherapifunc.azurewebsites.net/api/FuncTest?location=${location}`);            const data = await response.json();
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
        // Convert wind speed from m/s to km/h
        const windSpeedInKmh = (data.wind_speed * 3.6).toFixed(2); // Convert and round to 2 decimals

        // Get current time
        const currentTime = new Date();
        const timeString = currentTime.toLocaleString();  // Use toLocaleString to format the time
        
        weatherDisplay.innerHTML = `
            <h2>Weather in ${data.city} (${timeString})</h2>
            <p>Temperature: ${data.temperature}°C</p>
            <p>Description: ${data.description}</p>
            <p>Humidity: ${data.humidity}%</p>
            <p>Wind Speed: ${windSpeedInKmh} km/h</p>
            <h3>Recommendations</h3>
            <p>${data.recommendations}</p>
        `;
    } else {
        weatherDisplay.innerHTML = 'No data available';
    }
}




