/** Portada de la tienda con el mensaje principal y las marcas asociadas. */
// Datos fijos: no cambian mientras se usa la página, por eso no necesitan useState.
const marcas = ['Logitech', 'Asus', 'Corsair', 'Razer', 'HyperX', 'MSI'];

export default function Inicio() {
  return (
    <section id="inicio" className="hero-section text-white text-center">
      <div className="container">
        <p className="eyebrow">TIENDA GAMER · SANTIAGO, CHILE</p>
        <h1 className="display-5 fw-bold">Sube de nivel tu setup</h1>
        <p className="lead mx-auto hero-description">
          Hardware, periféricos y todo lo geek para gamers, streamers y creadores de
          contenido.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <a href="#catalogo" className="btn btn-success btn-lg">
            Ver productos
          </a>
          <a href="#ofertas" className="btn btn-outline-light btn-lg">
            Ofertas del día
          </a>
        </div>
        <div className="mt-5">
          <p className="small text-white-50 mb-2">Marcas asociadas</p>
          {/* map recorre el arreglo y crea una etiqueta por marca. */}
          {marcas.map((marca) => (
            <span key={marca} className="badge bg-secondary m-1 p-2">
              {marca}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
