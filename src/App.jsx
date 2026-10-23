/** Compone las secciones de la tienda y guarda el estado del carrito. */
import { useState } from 'react';
import productos from './data/productos.json';
import Header from './components/Header';
import Inicio from './components/Inicio';
import Ofertas from './components/Ofertas';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Blog from './components/Blog';
import Registro from './components/Registro';
import Footer from './components/Footer';
import './App.css';
// Los nombres con mayúscula en JSX representan componentes importados.
// App compone la tienda; Admin tiene su propia entrada y no se monta aquí.
export default function App() {
  // El carrito vive en App porque lo usan Header, Catalogo y Carrito.
  // Cada elemento guarda id, nombre, precio y cantidad.
  const [carrito, setCarrito] = useState([]);

  // Igual que en la Evaluación 1: busca el producto y suma 1 si queda stock.
  function agregarAlCarrito(id) {
    const producto = productos.find((p) => p.id === id);
    const itemExistente = carrito.find((item) => item.id === id);

    if (itemExistente) {
      // No se puede agregar más unidades que el stock disponible.
      if (itemExistente.cantidad >= producto.stock) {
        return;
      }
      // map crea un arreglo nuevo: el estado nunca se modifica directamente.
      setCarrito(
        carrito.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
        ),
      );
    } else {
      setCarrito([
        ...carrito,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        },
      ]);
    }
  }

  function eliminarItem(id) {
    // filter devuelve un arreglo nuevo sin el producto eliminado.
    setCarrito(carrito.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  // Suma las cantidades para el contador del menú (como en la Evaluación 1).
  let cantidadTotal = 0;
  for (let i = 0; i < carrito.length; i++) {
    cantidadTotal = cantidadTotal + carrito[i].cantidad;
  }

  return (
    <>
      {/* El fragmento agrupa elementos sin añadir un contenedor al HTML. */}
      <Header cantidadCarrito={cantidadTotal} />
      {/* El orden de estos componentes determina el orden de las secciones. */}
      <main id="contenido">
        <Inicio />
        <Ofertas />
        <section id="catalogo" className="section-space">
          <div className="container">
            {/* En pantallas grandes el carrito queda a la derecha; en celular, abajo. */}
            <div className="row g-4">
              <div className="col-lg-8">
                <Catalogo carrito={carrito} onAgregar={agregarAlCarrito} />
              </div>
              <div className="col-lg-4">
                <Carrito
                  items={carrito}
                  onEliminar={eliminarItem}
                  onVaciar={vaciarCarrito}
                />
              </div>
            </div>
          </div>
        </section>
        <Blog />
        <Registro />
      </main>
      <Footer />
    </>
  );
}
