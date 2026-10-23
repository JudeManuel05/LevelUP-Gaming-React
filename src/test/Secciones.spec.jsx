import { render, screen, cleanup } from '@testing-library/react';
import Ofertas from '../components/Ofertas';
import Blog from '../components/Blog';
import Footer from '../components/Footer';

describe('Secciones de contenido', () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 32: Ofertas calcula el descuento con el precio del JSON */
  it('Ofertas muestra el precio anterior y el descuento', () => {
    render(<Ofertas />);

    // Teclado: antes $109.990, ahora $89.990 → 18% de descuento.
    expect(screen.getByText('$109.990')).toBeTruthy();
    expect(screen.getByText('-18%')).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(4);
  });

  /* Caso de Prueba 33: Blog muestra un artículo por cada elemento del arreglo */
  it('Blog muestra los 2 artículos', () => {
    render(<Blog />);

    expect(screen.getAllByRole('article').length).toBe(2);
  });

  /* Caso de Prueba 34: Footer calcula el año actual */
  it('Footer muestra el año actual', () => {
    render(<Footer />);

    const anio = String(new Date().getFullYear());

    expect(screen.getByRole('contentinfo').textContent).toContain(anio);
  });
});
