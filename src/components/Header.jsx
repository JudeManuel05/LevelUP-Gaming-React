/** Controla el menú móvil con React y conserva la navegación por anclas. */
import { useState } from 'react';
import Logo from './Logo';
// cantidadCarrito es una prop: el dato viene desde App y Header solo lo muestra.
export default function Header({ cantidadCarrito }) {
  // useState devuelve el valor actual y una función que lo actualiza.
  // Al cambiar open, React renderiza de nuevo este componente: no se edita el DOM a mano.
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        aria-label="Navegación principal"
      >
        <div className="container">
          <a className="navbar-brand" href="#inicio" aria-label="LevelUp Gaming, inicio">
            {/* Reutilizamos el mismo componente visual que en Footer y Admin. */}
            <Logo />
          </a>
          {/* onClick recibe una función; se ejecuta al pulsar, no durante el render. */}
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menu-principal"
            aria-expanded={open}
            aria-label="Abrir o cerrar menú"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* La clase show y aria-expanded reflejan el mismo estado del menú. */}
          <div
            id="menu-principal"
            className={`collapse navbar-collapse ${open ? 'show' : ''}`}
          >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              {/* map genera un enlace por entrada; key identifica cada elemento. */}
              {[
                ['inicio', 'Inicio'],
                ['ofertas', 'Ofertas'],
                ['catalogo', 'Productos'],
                ['blog', 'Blog'],
                ['registro', 'Registro'],
              ].map(([id, label]) => (
                <li className="nav-item" key={id}>
                  {/* El ancla navega a la sección y el evento cierra el menú móvil. */}
                  <a className="nav-link" href={`#${id}`} onClick={() => setOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <a className="nav-link" href="/admin.html">
                  Admin
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="btn btn-success ms-lg-2 mt-2 mt-lg-0"
                  href="#carrito"
                  onClick={() => setOpen(false)}
                >
                  🛒 Carrito{' '}
                  <span
                    className="badge bg-light text-dark"
                    aria-label="Productos en el carrito"
                  >
                    {cantidadCarrito}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
