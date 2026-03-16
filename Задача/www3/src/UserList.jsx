// UserList.jsx
// 1 - 4 задания
import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error)   return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Пользователи</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}