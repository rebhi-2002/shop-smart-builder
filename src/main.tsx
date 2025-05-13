
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FramerMotionProvider } from './providers/FramerMotionProvider'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

createRoot(document.getElementById("root")!).render(
  <FramerMotionProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </FramerMotionProvider>
);
