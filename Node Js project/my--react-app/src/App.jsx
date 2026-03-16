import { useState } from 'react';
import UserInfo from './UserInfo'; // Импортируем наш компонент

function App() {
  // Создаем состояние "статус"
  const [status, setStatus] = useState("Оффлайн");

  // Функция для переключения статуса
  const toggleStatus = () => {
    setStatus(status === "Оффлайн" ? "В сети" : "Оффлайн");
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '300px',
      margin: '20px auto',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Вставляем карточку пользователя */}
      <UserInfo name="Алексей" role="Frontend Разработчик" />

      {/* Статус пользователя с цветом */}
      <p>
        Статус: <strong style={{ color: status === 'В сети' ? 'green' : 'red' }}>{status}</strong>
      </p>

      {/* Кнопка для смены статуса */}
      <button 
        onClick={toggleStatus} 
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white'
        }}
      >
        Изменить статус
      </button>
    </div>
  )
}

export default App;