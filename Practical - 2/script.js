const weatherData = {
      Ahmedabad: '40°C',
      Mumbai: '32°C',
      Delhi: '38°C',
      Bangalore: '28°C',
      Chennai: '35°C',
    };

    document.getElementById('getWeatherBtn').addEventListener('click', () => {
      const city = document.getElementById('cityInput').value.trim();
      const result = document.getElementById('result');

      if (weatherData[city]) {
        result.textContent = `The weather in ${city} is ${weatherData[city]}`;
      } else {
        result.textContent = `Weather data for "${city}" not found.`;
      }
    });