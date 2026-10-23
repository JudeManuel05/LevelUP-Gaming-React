/** Ofertas relámpago: muestra el precio anterior y el precio actual del catálogo. */
import productos from '../data/productos.json';

// Solo guardamos el id y el precio antes del descuento; el resto viene del JSON.
const ofertas = [
  { id: 2, precioAnterior: 109990 },
  { id: 4, precioAnterior: 799990 },
  { id: 3, precioAnterior: 74990 },
  { id: 8, precioAnterior: 299990 },
];

export default function Ofertas() {
  return (
    <section id="ofertas" className="section-space">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <h2 className="mb-0">⚡ Ofertas Relámpago</h2>
          <span className="badge bg-danger fs-6">Solo por hoy</span>
        </div>
        {/* col-6 muestra 2 ofertas por fila en celular y col-md-3 muestra 4 en escritorio. */}
        <div className="row g-4">
          {ofertas.map((oferta) => {
            // find busca el producto del catálogo que corresponde a la oferta.
            const producto = productos.find((p) => p.id === oferta.id);
            const descuento = Math.round(
              (1 - producto.precio / oferta.precioAnterior) * 100,
            );
            return (
              <div className="col-6 col-md-3" key={oferta.id}>
                <div className="card shadow-sm h-100 text-center">
                  <div className="card-body">
                    <img
                      src={producto.imagen}
                      alt=""
                      className="oferta-imagen"
                      loading="lazy"
                    />
                    <h3 className="h6 mt-2">{producto.nombre}</h3>
                    <p className="text-muted text-decoration-line-through mb-0">
                      ${Number(oferta.precioAnterior).toLocaleString('es-CL')}
                    </p>
                    <p className="text-danger fw-bold mb-0">
                      ${Number(producto.precio).toLocaleString('es-CL')}{' '}
                      <span className="badge bg-danger">-{descuento}%</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
