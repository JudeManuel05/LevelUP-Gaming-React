/** Identidad visual compartida por el encabezado, el pie de página y Admin. */
export default function Logo() {
  // Componente de presentación sin estado: comparte el mismo JSX entre varias páginas.
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true">
        ▲
      </span>
      <span>
        Level<span className="text-success">Up</span> Gaming
      </span>
    </span>
  );
}
