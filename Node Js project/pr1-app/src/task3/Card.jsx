import React from 'react';

function Card({ children }) {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      {children}
    </div>
  )
}

export default Card
