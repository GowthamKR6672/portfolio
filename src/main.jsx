import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// Apply the saved theme before first paint to avoid a flash of the default one.
document.documentElement.dataset.theme = 'welcome'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
