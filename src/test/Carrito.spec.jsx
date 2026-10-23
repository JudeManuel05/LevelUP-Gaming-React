import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Carrito from '../components/Carrito';

// Datos de prueba: 2 mouse de $10.000 y 1 teclado de $5.000.
const items = [
  { id: 1, nombre: 'Mouse', precio: 10000, cantidad: 2 },
  { id: 2, nombre: 'Teclado', precio: 5000, cantidad: 1 },
];

describe('Componente Carrito', () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 14: Con el carrito vacío se muestra un mensaje */
  it('muestra un mensaje cuando el carrito está vacío', () => {
    render(<Carrito items={[]} onEliminar={() => {}} onVaciar={() => {}} />);

    expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Vaciar carrito' }).disabled).toBeTrue();
  });

  /* Caso de Prueba 15: El total suma precio x cantidad de cada producto */
  it('calcula el total del carrito', () => {
    render(<Carrito items={items} onEliminar={() => {}} onVaciar={() => {}} />);

    expect(screen.getByText('Total: $25.000')).toBeTruthy();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  /* Caso de Prueba 16 (mock): Eliminar avisa al padre con el id correcto */
  it('llama a onEliminar con el id del producto', () => {
    const onEliminar = jasmine.createSpy('onEliminar');
    render(<Carrito items={items} onEliminar={onEliminar} onVaciar={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Teclado' }));

    expect(onEliminar).toHaveBeenCalledWith(2);
  });

  /* Caso de Prueba 17 (mock): Vaciar avisa al padre */
  it('llama a onVaciar al presionar "Vaciar carrito"', () => {
    const onVaciar = jasmine.createSpy('onVaciar');
    render(<Carrito items={items} onEliminar={() => {}} onVaciar={onVaciar} />);

    fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));

    expect(onVaciar).toHaveBeenCalledTimes(1);
  });
});
