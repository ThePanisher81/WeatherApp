document.getElementById('fetchWeather').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    const email = document.getElementById('email').value; // Get email value

    if (!location) {
        alert('Please enter a location');
        return;
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        let url = `https://weatherapifunc.azurewebsites.net/api/FuncTest?location=${encodeURIComponent(location)}`;

        // Append email if valid
        if (email) {
            url += `&email=${encodeURIComponent(email)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('Error fetching weather data');
    }
});

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for basic email format
    return re.test(email);
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data) {
        const windSpeedInKmh = (data.wind_speed * 3.6).toFixed(2);
        const currentTime = new Date();
        const timeString = currentTime.toLocaleString();

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