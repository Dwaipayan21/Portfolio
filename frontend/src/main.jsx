import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from "./context/AuthContext"

createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme='dark' storageKey='portfolio-theme'>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
)
