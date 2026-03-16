import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './Weather.jsx'
import CurrencyRates from './CurrencyRates';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyRates /> {/* <App /> */}
  </StrictMode>,
)
