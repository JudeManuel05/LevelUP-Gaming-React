import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Catalogo from '../components/Catalogo';

describe('Componente Catalogo', () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 9: Al inicio se muestran los 10 productos del JSON */
  it('muestra todos los productos al inicio', () => {
    render(<Catalogo carrito={[]} onAgregar={() => {}} />);

    expect(screen.getAllByRole('article').length).toBe(10);
    expect(screen.getByRole('status').textContent).toBe('Mostrando 10 productos');
  });

  /* Caso de Prueba 10: El filtro cambia el estado y muestra solo esa categoría */
  it('filtra los productos al elegir una categoría', () => {
    render(<Catalogo carrito={[]} onAgregar={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Sillas Gamer' }));

    expect(screen.getAllByRole('article').length).toBe(2);
    expect(
      screen.getByRole('heading', { name: 'Silla Gamer Cougar Armor' }),
    ).toBeTruthy();
  });

  /* Caso de Prueba 11: El botón Todos vuelve a mostrar el catálogo completo */
  it('vuelve a mostrar todo al presionar "Todos"', () => {
    render(<Catalogo carrito={[]} onAgregar={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Accesorios' }));
    expect(screen.getAllByRole('article').length).toBe(2);

    fireEvent.click(screen.getByRole('button', { name: 'Todos' }));
    expect(screen.getAllByRole('article').length).toBe(10);
  });

  /* Caso de Prueba 12: Usa el carrito para desactivar los productos ya agregados */
  it('desactiva el producto cuyo stock completo ya está en el carrito', () => {
    // La Silla Secretlab (id 7) tiene stock 1 y ya hay 1 en el carrito.
    const carrito = [
      { id: 7, nombre: 'Silla Gamer Secretlab Titan', precio: 459990, cantidad: 1 },
    ];
    render(<Catalogo carrito={carrito} onAgregar={() => {}} />);

    const botones = screen.getAllByRole('button', { name: 'Agregar al carrito' });

    // El orden de las tarjetas es el del JSON: la silla es la séptima (índice 6).
    expect(botones[6].disabled).toBeTrue();
    expect(botones[0].disabled).toBeFalse();
  });

  /* Caso de Prueba 13 (mock): Catalogo entrega onAgregar a cada Producto */
  it('entrega la función onAgregar a las tarjetas', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<Catalogo carrito={[]} onAgregar={onAgregar} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Agregar al carrito' })[0]);

    expect(onAgregar).toHaveBeenCalledWith(1);
  });
});
