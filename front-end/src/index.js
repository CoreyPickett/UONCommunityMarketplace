//npm run start will run this file
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Used to run app, similar to main.jsx in tutorial video
createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <App />
  </StrictMode>,
)