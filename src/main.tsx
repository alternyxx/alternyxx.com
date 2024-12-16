import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

let warning = false;
let device;

// Checks
if (navigator.gpu) {
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter) {
        device = await adapter.requestDevice();
    } else {
        warning = true;
    }
} else {
    warning = true;    
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App device={device} warning={warning} />
  </StrictMode>,
);
