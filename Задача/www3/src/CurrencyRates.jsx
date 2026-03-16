// src/CurrencyRates.jsx
// 7,8,9 задания
import { useState, useEffect } from 'react';

const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

export default function CurrencyRates() {
  const [rates, setRates] = useState({ USD: 1, EUR: null, KZT: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error(`HTTP ошибка: ${response.status}`);
      }

      if (response.status !== 200) {
        throw new Error('API недоступен (статус не 200)');
      }

      const data = await response.json();

      if (data.result !== 'success') {
        throw new Error('Ошибка в ответе API');
      }

      setRates({
        USD: 1,
        EUR: data.rates.EUR ? Number(data.rates.EUR.toFixed(4)) : null,
        KZT: data.rates.KZT ? Number(data.rates.KZT.toFixed(2)) : null,
      });

      setLastUpdate(new Date(data.time_last_update_utc).toLocaleString());
    } catch (err) {
      setError(err.message || 'API недоступен');
      setRates({ USD: 1, EUR: null, KZT: null });
    } finally {
      setLoading(false);
    }
  };

  // Загрузка при монтировании
  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div style={{ margin: '2rem 0', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Курсы валют (относительно 1 USD)</h2>

      {loading && <p>Загрузка курсов...</p>}

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          {error} <br />
          Попробуйте нажать «Обновить»
        </p>
      )}

      {!loading && !error && rates.EUR && rates.KZT && (
        <div>
          <p><strong>1 USD = {rates.EUR} EUR</strong></p>
          <p><strong>1 USD = {rates.KZT} KZT</strong></p>
          {lastUpdate && <small>Последнее обновление: {lastUpdate}</small>}
        </div>
      )}

      <button
        onClick={fetchRates}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          background: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Обновление...' : 'Обновить данные'}
      </button>

      <p style={{ fontSize: '0.85rem', marginTop: '1.5rem', color: '#555' }}>
        Данные предоставлены <a href="https://www.exchangerate-api.com">ExchangeRate-API</a> (обновление ≈ 1 раз в сутки)
      </p>
    </div>
  );
}