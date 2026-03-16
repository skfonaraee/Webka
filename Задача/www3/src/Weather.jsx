// Weather.jsx
// 6 задание
import { useState } from 'react';

const API_KEY = '1f72df5af44111d6871705c9355064ee'; // ← сюда вставить

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('Город не найден или ошибка API');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Введите город"
      />
      <button onClick={getWeather} disabled={loading}>
        Получить погоду
      </button>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Температура: {Math.round(weather.main.temp)} °C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}