/** Formulario para agregar productos al inventario; el navegador valida los campos. */
// onAgregar es una prop de tipo función definida en Admin, dueño de la lista.
export default function FormProducto({ onAgregar }) {
  // El navegador verifica required y min antes de ejecutar este handler.
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    // Igual que en la Evaluación 1 se leen los valores de cada campo.
    // Number convierte el texto de precio y stock en números.
    onAgregar({
      nombre: form.nombre.value,
      categoria: form.categoria.value,
      marca: form.marca.value,
      precio: Number(form.precio.value),
      stock: Number(form.stock.value),
    });
    form.reset();
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h4">Agregar nuevo producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input id="nombre" name="nombre" className="form-control" required />
            </div>
            <div className="col-md-2">
              <label htmlFor="categoria" className="form-label">
                Categoría
              </label>
              <select id="categoria" name="categoria" className="form-select">
                <option>Periféricos</option>
                <option>Hardware PC</option>
                <option>Sillas Gamer</option>
                <option>Accesorios</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="marca" className="form-label">
                Marca
              </label>
              <input id="marca" name="marca" className="form-control" required />
            </div>
            <div className="col-6 col-md-2">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                id="precio"
                name="precio"
                type="number"
                min="1"
                className="form-control"
                required
              />
            </div>
            <div className="col-6 col-md-2">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                className="form-control"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Agregar producto
          </button>
        </form>
      </div>
    </div>
  );
}
