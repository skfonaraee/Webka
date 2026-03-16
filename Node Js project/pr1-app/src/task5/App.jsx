import React from "react";
import Product from "./Product"

function App() {
  const products = [
    { id: 1, title: "Телефон", price: 50000 },
    { id: 2, title: "Ноутбук", price: 120000 },
    { id: 3, title: "Наушники", price: 8000 }
  ]

  return (
    <>
      {products.map(p => (
        <Product key={p.id} title={p.title} price={p.price} />
      ))}
    </>
  )
}

export default App
