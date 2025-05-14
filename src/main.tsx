
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FramerMotionProvider } from './providers/FramerMotionProvider'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById("root")!).render(
  <FramerMotionProvider>
    <Router>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Router>
  </FramerMotionProvider>
);
