import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import "@radix-ui/themes/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Theme>
        <App />
      </Theme>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
