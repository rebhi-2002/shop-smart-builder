import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './contexts/CartContext'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </HelmetProvider>
);
