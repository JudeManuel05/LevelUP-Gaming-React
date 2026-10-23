import { useState } from 'react';
import Logo from '../components/Logo';
import productosIniciales from '../data/productos.json';
import Login from './Login';
import FormProducto from './FormProducto';

/** Panel de inventario con la regla de stock crítico; no constituye autenticación real. */
export default function Admin() {
  // Estado local en memoria: false muestra Login y true muestra el panel.
  // No se persiste; recargar crea el componente nuevamente con false.
  const [loggedIn, setLoggedIn] = useState(false);
  // Copia del JSON en el estado para poder cambiar el inventario mientras se usa la página.
  const [productos, setProductos] = useState(productosIniciales);

  function cambiarStock(id, cambio) {
    setProductos(
      productos.map((p) =>
        // Math.max evita que el stock baje de 0.
        p.id === id ? { ...p, stock: Math.max(0, p.stock + cambio) } : p,
      ),
    );
  }

  function eliminarProducto(id) {
    setProductos(productos.filter((p) => p.id !== id));
  }

  function agregarProducto(datos) {
    // El nuevo id es el mayor existente + 1, como en la Evaluación 1.
    let nuevoId = 1;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id >= nuevoId) {
        nuevoId = productos[i].id + 1;
      }
    }
    setProductos([...productos, { ...datos, id: nuevoId, imagen: '' }]);
  }

  // Regla de negocio: stock entre 1 y 3 unidades es crítico.
  const criticos = productos.filter((p) => p.stock > 0 && p.stock <= 3).length;

  return (
    <div className="admin-page">
      <header className="site-header">
        <div className="container py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <a href="/" className="navbar-brand">
            <Logo />
          </a>
          <a href="/" className="btn btn-outline-light">
            Volver a la tienda
          </a>
        </div>
      </header>
      <main className="container py-5">
        {/* Renderizado condicional: solo se monta una de las dos vistas. */}
        {loggedIn ? (
          <section aria-labelledby="admin-title">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <p className="eyebrow">ESPACIO DE ADMINISTRACIÓN</p>
                <h1 id="admin-title" className="h2">
                  Panel Administrativo
                </h1>
              </div>
              <button className="btn btn-outline-dark" onClick={() => setLoggedIn(false)}>
                Cerrar sesión
              </button>
            </div>
            {/* && muestra la alerta solo cuando hay productos con stock crítico. */}
            {criticos > 0 && (
              <p className="alert alert-danger" role="alert">
                ⚠ Tienes {criticos} producto(s) con stock crítico (3 unidades o menos).
              </p>
            )}
            <FormProducto onAgregar={agregarProducto} />
            <div className="card">
              <div className="card-body">
                <h2 className="h4">Inventario de productos</h2>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Precio (CLP)</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Usamos el ID como key de cada fila. */}
                      {productos.map((p) => (
                        <tr
                          key={p.id}
                          className={
                            p.stock <= 0
                              ? 'table-secondary'
                              : p.stock <= 3
                                ? 'table-danger'
                                : ''
                          }
                        >
                          <th scope="row">{p.id}</th>
                          <td>{p.nombre}</td>
                          <td>{p.categoria}</td>
                          <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                          <td>{p.stock}</td>
                          <td>
                            {p.stock <= 0 ? (
                              <span className="badge bg-secondary">Agotado</span>
                            ) : p.stock <= 3 ? (
                              <span className="badge bg-danger">Stock crítico</span>
                            ) : (
                              <span className="badge bg-success">Disponible</span>
                            )}
                          </td>
                          <td className="text-nowrap">
                            <button
                              className="btn btn-sm btn-outline-secondary me-1"
                              aria-label={`Restar stock ${p.nombre}`}
                              onClick={() => cambiarStock(p.id, -1)}
                            >
                              -
                            </button>
                            <button
                              className="btn btn-sm btn-outline-secondary me-1"
                              aria-label={`Sumar stock ${p.nombre}`}
                              onClick={() => cambiarStock(p.id, 1)}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              aria-label={`Eliminar ${p.nombre}`}
                              onClick={() => eliminarProducto(p.id)}
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Una función enviada como prop permite que el hijo solicite cambiar al padre.
          <Login onLogin={() => setLoggedIn(true)} />
        )}
      </main>
    </div>
  );
}
