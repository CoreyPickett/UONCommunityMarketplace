//npm run start will run this file
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "uon-community-marketplac-8327c.firebaseapp.com",
  projectId: "uon-community-marketplac-8327c",
  storageBucket: "uon-community-marketplac-8327c.firebasestorage.app",
  messagingSenderId: "465593244377",
  appId: "1:465593244377:web:8c125eb152218b9dacbcc8",
  measurementId: "G-0TXYLTCXG8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Used to run app, similar to main.jsx in tutorial video
createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <App />
  </StrictMode>,
)