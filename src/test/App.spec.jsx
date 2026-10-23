import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Componente App (carrito)', () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 24: Agregar productos actualiza el contador y el total */
  it('agregar al carrito actualiza el contador del menú y el total', () => {
    render(<App />);
    const botones = screen.getAllByRole('button', { name: 'Agregar al carrito' });

    // El primer botón es el Mouse Gamer Logitech G502 ($29.990).
    fireEvent.click(botones[0]);
    fireEvent.click(botones[0]);

    expect(screen.getByLabelText('Productos en el carrito').textContent).toBe('2');
    expect(screen.getByText('Total: $59.980')).toBeTruthy();
  });

  /* Caso de Prueba 25: No se puede agregar más que el stock disponible */
  it('no permite superar el stock del producto', () => {
    render(<App />);
    // La Silla Gamer Secretlab Titan (séptima tarjeta) tiene stock 1.
    const silla = screen.getAllByRole('button', { name: 'Agregar al carrito' })[6];

    fireEvent.click(silla);

    expect(silla.disabled).toBeTrue();
    expect(screen.getByLabelText('Productos en el carrito').textContent).toBe('1');
  });

  /* Caso de Prueba 26: Eliminar y vaciar dejan el carrito en $0 */
  it('eliminar y vaciar el carrito vuelven el total a $0', () => {
    render(<App />);
    const botones = screen.getAllByRole('button', { name: 'Agregar al carrito' });
    fireEvent.click(botones[0]);
    fireEvent.click(botones[5]);

    fireEvent.click(
      screen.getByRole('button', { name: 'Eliminar Mouse Gamer Logitech G502' }),
    );
    expect(screen.getByText('Total: $79.990')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));
    expect(screen.getByText('Total: $0')).toBeTruthy();
    expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
  });
});
