// PostUserForm.jsx
// 5 задание
import { useState } from 'react';

export default function PostUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error('Ошибка сервера');

      setStatus('success');
      setName('');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Имя"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit" disabled={status === 'sending'}>
          Отправить
        </button>
      </form>

      {status === 'sending' && <p>Отправка...</p>}
      {status === 'success' && <p style={{ color: 'green' }}>Данные успешно отправлены!</p>}
      {status === 'error'   && <p style={{ color: 'red' }}>Ошибка при отправке</p>}
    </div>
  );
}