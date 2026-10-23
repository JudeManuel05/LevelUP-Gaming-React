import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import '../App.css';
import './Admin.css';
import Admin from './Admin';

// Entrada independiente: no renderiza App ni las secciones de la tienda.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Admin />
  </React.StrictMode>,
);
