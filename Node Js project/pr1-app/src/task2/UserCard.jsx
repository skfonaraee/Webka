import React from 'react';

function UserCard({ name, age }) {
  return (
    <div>
      <h2>Имя: {name}</h2>
      <p>Возраст: {age}</p>
    </div>
  )
}

export default UserCard