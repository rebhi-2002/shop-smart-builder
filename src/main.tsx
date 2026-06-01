import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './contexts/CartContext'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById("root")!).render(
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>
);
