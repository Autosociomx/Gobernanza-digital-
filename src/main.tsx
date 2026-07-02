/*!
 * NAYARIT DIGITAL — Módulo: Core / Entry Point
 * © 2026 ConnectX Servicios S.A. de C.V. (Tepic, Nayarit, México)
 * Custodio de PI: Fundación ConnectX A.C.
 * Vector: NYD-200 | Pipeline: Nivel 1 | Protocolo: J.Jackson v2
 * PROPIETARIO — Prohibida su copia, modificación o redistribución
 * sin contrato vigente. Ver /aviso-legal
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
