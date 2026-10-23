/** Sección de noticias: los artículos se guardan en un arreglo y se recorren con map. */
const articulos = [
  {
    id: 'guia-tarjeta-video',
    titulo: 'Guía para elegir tu primera tarjeta de vídeo en 2026',
    resumen:
      'Presupuesto, resolución, VRAM y consumo: todo lo que debes revisar antes de comprar tu GPU. Para 1080p una gama media es suficiente; 1440p o 4K exigen modelos más potentes.',
  },
  {
    id: 'mantenimiento-pc',
    titulo: 'Mantenimiento preventivo: ¿cada cuánto limpiar tu PC?',
    resumen:
      'El polvo y las altas temperaturas acortan la vida de tus componentes. Te recomendamos limpiar tu equipo cada 3 a 6 meses y revisar la pasta térmica si tiene más de dos años.',
  },
];

export default function Blog() {
  // Contenido estático: no necesita estado ni eventos.
  return (
    <section id="blog" className="section-space bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Blog / Noticias</h2>
        <div className="row g-4">
          {articulos.map((articulo) => (
            <div className="col-md-6" key={articulo.id}>
              <article id={articulo.id} className="card shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title h5">{articulo.titulo}</h3>
                  <p className="text-muted small">Publicado por LevelUp Gaming</p>
                  <p className="card-text">{articulo.resumen}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
