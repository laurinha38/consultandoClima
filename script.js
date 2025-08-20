const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

const apiKey = 'ff829add482b4e0c94e21825251008';

async function fetchWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no&lang=pt`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Cidade '${city}' não encontrada.`);
        }

        const data = await response.json();
        renderWeatherCard(data);

    } catch (error) {
        renderError(error.message);
    }
}

function renderWeatherCard(data) {
    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');

    const loc = data.location;
    const cur = data.current;

    document.getElementById('city-name').textContent = `${loc.name} - ${loc.country}`;
    document.getElementById('local-time').textContent = `Hora local: ${loc.localtime}`;

    const iconUrl = cur.condition.icon.startsWith('//') ? 'https:' + cur.condition.icon : cur.condition.icon;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon').alt = cur.condition.text;

    document.getElementById('temperature').textContent = `${Math.round(cur.temp_c)}°C`;
    document.getElementById('condition').textContent = cur.condition.text;
    document.getElementById('feels-like').textContent = `${Math.round(cur.feelslike_c)}°C`;
    document.getElementById('humidity').textContent = `${cur.humidity}%`;
    document.getElementById('wind-speed').textContent = `${cur.wind_kph} km/h`;
    document.getElementById('pressure').textContent = `${cur.pressure_mb} mb`;
    document.getElementById('visibility').textContent = `${cur.vis_km} km`;
    document.getElementById('uv-index').textContent = cur.uv;
}

function renderError(message) {
    errorMessage.classList.remove('hidden');
    weatherResult.classList.add('hidden');
    errorMessage.querySelector('p').textContent = message;
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city) {
        fetchWeather(city);
    }
});