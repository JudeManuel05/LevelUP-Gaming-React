/** Pie compartido con enlaces a las secciones y año calculado al cargar el módulo. */
import Logo from './Logo';
const currentYear = new Date().getFullYear();
// Se calcula al cargar el módulo, fuera del render; no requiere estado interactivo.
export default function Footer() {
  return (
    <footer className="site-footer text-light py-4">
      <div className="container">
        <div className="row g-3 align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <Logo />
          </div>
          <div className="col-md-8 text-center text-md-end small">
            <p className="mb-1">
              <a href="#inicio">Inicio</a> · <a href="#catalogo">Productos</a> ·{' '}
              <a href="#blog">Blog</a> · <a href="#registro">Registro</a>
            </p>
            <address className="mb-1">
              Contacto:{' '}
              <a href="mailto:contacto@levelupgaming.cl">contacto@levelupgaming.cl</a> ·
              +56 9 1234 5678 · Santiago, Chile
            </address>
            <p className="mb-0">
              © {currentYear} LevelUp Gaming. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
