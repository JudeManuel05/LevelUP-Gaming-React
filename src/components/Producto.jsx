/** Tarjeta de un producto: muestra sus datos, el estado del stock y el botón del carrito. */
import { useState } from 'react';
import './Producto.css';
// La desestructuración extrae las props enviadas desde Catalogo.
// Las props son datos de entrada: este componente no las modifica.
export default function Producto({
  id,
  nombre,
  marca,
  categoria,
  precio,
  stock,
  imagen,
  enCarrito,
  onAgregar,
}) {
  // Cada tarjeta conserva su propio estado de error de imagen, independiente de las demás.
  const [failed, setFailed] = useState(false);

  // Regla de negocio de la Evaluación 1: 3 unidades o menos es stock crítico.
  let etiquetaStock = `Stock: ${stock}`;
  let colorStock = 'bg-success';
  if (stock <= 0) {
    etiquetaStock = 'Sin stock';
    colorStock = 'bg-secondary';
  } else if (stock <= 3) {
    etiquetaStock = `¡Últimas ${stock} unidades!`;
    colorStock = 'bg-danger';
  }

  // Se desactiva sin stock o cuando el carrito ya tiene todas las unidades.
  const agotado = stock <= 0 || enCarrito >= stock;

  return (
    <article className="card producto-card shadow-sm h-100 text-center">
      <div className="card-body d-flex flex-column">
        {/* El ternario elige entre la imagen y su reemplazo según datos y estado. */}
        {imagen?.trim() && !failed ? (
          <img
            src={imagen}
            alt={nombre}
            className="producto-imagen"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="producto-placeholder">Imagen no disponible</div>
        )}
        <h3 className="card-title h6 mt-2">{nombre}</h3>
        <p className="text-muted small mb-1">
          {marca} · {categoria}
        </p>
        <p className="fw-bold producto-precio">
          {/* Las llaves insertan expresiones JS; es-CL aplica el formato numérico local. */}
          ${Number(precio).toLocaleString('es-CL')}
        </p>
        <p>
          <span className={`badge ${colorStock}`}>{etiquetaStock}</span>
        </p>
        {/* onAgregar es una función enviada como prop: el hijo avisa al padre (App). */}
        <button
          type="button"
          className="btn btn-success btn-sm mt-auto"
          disabled={agotado}
          onClick={() => onAgregar(id)}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
