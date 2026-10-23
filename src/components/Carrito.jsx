/** Muestra los productos agregados, el total y las acciones del carrito. */
// items, onEliminar y onVaciar llegan desde App, que es el dueño del estado.
export default function Carrito({ items, onEliminar, onVaciar }) {
  // Igual que en la Evaluación 1: se recorre el carrito y se suma cada subtotal.
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].precio * items[i].cantidad;
  }

  return (
    <aside id="carrito" className="card shadow-sm carrito">
      <div className="card-body">
        <h2 className="h4">🛒 Tu carrito</h2>
        {/* Renderizado condicional: mensaje si está vacío, lista si tiene productos. */}
        {items.length === 0 ? (
          <p className="text-muted">Tu carrito está vacío.</p>
        ) : (
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.nombre}
                  <br />
                  <small className="text-muted">
                    {item.cantidad} x ${Number(item.precio).toLocaleString('es-CL')}
                  </small>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  aria-label={`Eliminar ${item.nombre}`}
                  onClick={() => onEliminar(item.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="h5">Total: ${Number(total).toLocaleString('es-CL')}</p>
        <button
          type="button"
          className="btn btn-outline-danger w-100 mt-2"
          disabled={items.length === 0}
          onClick={onVaciar}
        >
          Vaciar carrito
        </button>
      </div>
    </aside>
  );
}
