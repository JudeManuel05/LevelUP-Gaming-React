import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Admin from '../admin/Admin';
import Login from '../admin/Login';
import FormProducto from '../admin/FormProducto';

describe('Página Admin', () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 27 (mock): Login avisa al padre con onLogin */
  it('Login llama a onLogin al presionar "Entrar al panel"', () => {
    const onLogin = jasmine.createSpy('onLogin');
    render(<Login onLogin={onLogin} />);

    fireEvent.click(screen.getByRole('button', { name: 'Entrar al panel' }));

    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  /* Caso de Prueba 28: Después del login se ve la alerta de stock crítico */
  it('muestra el panel con la alerta de stock crítico', () => {
    render(<Admin />);
    expect(screen.queryByRole('table')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Entrar al panel' }));

    // En productos.json hay 4 productos con stock entre 1 y 3.
    expect(screen.getByRole('alert').textContent).toContain('4 producto(s)');
    // 10 productos + 1 fila de encabezado.
    expect(screen.getAllByRole('row').length).toBe(11);
  });

  /* Caso de Prueba 29: Los botones + y - cambian el stock */
  it('suma y resta stock de un producto', () => {
    render(<Admin />);
    fireEvent.click(screen.getByRole('button', { name: 'Entrar al panel' }));

    // El teclado tiene stock 3 (crítico); al sumar 1 deja de serlo.
    fireEvent.click(
      screen.getByRole('button', { name: 'Sumar stock Teclado Mecánico Corsair K70' }),
    );
    expect(screen.getByRole('alert').textContent).toContain('3 producto(s)');

    fireEvent.click(
      screen.getByRole('button', { name: 'Restar stock Teclado Mecánico Corsair K70' }),
    );
    expect(screen.getByRole('alert').textContent).toContain('4 producto(s)');
  });

  /* Caso de Prueba 30 (mock): FormProducto entrega los datos convertidos a número */
  it('FormProducto llama a onAgregar con precio y stock como números', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<FormProducto onAgregar={onAgregar} />);

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Webcam' } });
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'Logitech' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '49990' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }));

    expect(onAgregar).toHaveBeenCalledWith({
      nombre: 'Webcam',
      categoria: 'Periféricos',
      marca: 'Logitech',
      precio: 49990,
      stock: 7,
    });
  });

  /* Caso de Prueba 31: Admin agrega y elimina productos, y cierra sesión */
  it('agrega y elimina productos del inventario', () => {
    render(<Admin />);
    fireEvent.click(screen.getByRole('button', { name: 'Entrar al panel' }));

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Webcam' } });
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'Logitech' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '49990' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }));
    expect(screen.getAllByRole('row').length).toBe(12);

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Webcam' }));
    expect(screen.getAllByRole('row').length).toBe(11);

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeTruthy();
  });
});
