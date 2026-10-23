import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
// El CSS propio se carga después de Bootstrap para permitir personalizaciones.
import './index.css';
import App from './App';

// Monta el árbol React en el contenedor definido por index.html.
// StrictMode activa comprobaciones adicionales de desarrollo; no es un elemento HTML.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
