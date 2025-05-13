
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FramerMotionProvider } from './providers/FramerMotionProvider' 

createRoot(document.getElementById("root")!).render(
  <FramerMotionProvider>
    <App />
  </FramerMotionProvider>
);
