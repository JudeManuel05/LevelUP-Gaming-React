/** Renderiza el catálogo con filtro por categoría en columnas responsive de Bootstrap. */
import { useState } from 'react';
import productos from '../data/productos.json';
// Importar el JSON proporciona datos locales; aquí no se hace una llamada HTTP.
import Producto from './Producto';
import './Catalogo.css';

// Los mismos botones de filtro de la Evaluación 1.
const categorias = ['Todos', 'Periféricos', 'Hardware PC', 'Sillas Gamer', 'Accesorios'];

// carrito y onAgregar llegan desde App, que es el dueño del estado del carrito.
export default function Catalogo({ carrito, onAgregar }) {
  // Solo guardamos la categoría elegida: la lista visible se calcula desde el JSON.
  const [categoria, setCategoria] = useState('Todos');

  // filter devuelve una copia con los productos de la categoría; no modifica el JSON.
  const productosVisibles =
    categoria === 'Todos'
      ? productos
      : productos.filter((producto) => producto.categoria === categoria);

  // Busca cuántas unidades de un producto ya están en el carrito.
  function cantidadEnCarrito(id) {
    const item = carrito.find((item) => item.id === id);
    return item ? item.cantidad : 0;
  }

  return (
    <>
      <h2>Nuestros productos</h2>
      <p className="text-muted">Revisa el stock disponible y arma tu carrito.</p>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {categorias.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className={`btn btn-sm ${categoria === nombre ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setCategoria(nombre)}
          >
            {nombre}
          </button>
        ))}
      </div>
      {/* El resumen se actualiza con el filtro y se anuncia a lectores de pantalla. */}
      <p className="text-secondary small" role="status">
        Mostrando {productosVisibles.length} productos
      </p>
      <div className="row g-4 catalogo">
        {/* map transforma cada objeto en JSX; el ID estable sirve como key. */}
        {/* Bootstrap muestra dos columnas desde sm y tres desde xl. */}
        {productosVisibles.map((producto) => (
          <div className="col-sm-6 col-xl-4" key={producto.id}>
            {/* El spread pasa las propiedades del objeto como props al componente. */}
            <Producto
              {...producto}
              enCarrito={cantidadEnCarrito(producto.id)}
              onAgregar={onAgregar}
            />
          </div>
        ))}
      </div>
    </>
  );
}
