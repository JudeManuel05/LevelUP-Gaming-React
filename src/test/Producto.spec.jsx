import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Producto from '../components/Producto';

describe('Componente Producto', () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 1: Mostrar el nombre del producto correctamente */
  it('muestra el nombre del producto', () => {
    render(
      <Producto
        id={1}
        nombre="Mouse Gamer Logitech G502"
        marca="Logitech"
        categoria="Periféricos"
        precio={29990}
        stock={15}
        imagen="/productos/mouse.svg"
        enCarrito={0}
      />,
    );

    const titulo = screen.getByRole('heading', {
      name: 'Mouse Gamer Logitech G502',
    });

    expect(titulo.textContent).toBe('Mouse Gamer Logitech G502');
  });

  /* Caso de Prueba 2: Boton Agregar al carrito */
  it('muestra el botón para agregar al carrito', () => {
    render(
      <Producto
        id={1}
        nombre="Mouse Gamer Logitech G502"
        marca="Logitech"
        categoria="Periféricos"
        precio={29990}
        stock={15}
        imagen="/productos/mouse.svg"
        enCarrito={0}
      />,
    );

    const boton = screen.getByRole('button', {
      name: 'Agregar al carrito',
    });

    expect(boton.textContent.trim()).toBe('Agregar al carrito');
    expect(boton.disabled).toBeFalse();
  });

  /* Caso de Prueba 3: El precio se muestra con formato chileno */
  it('muestra el precio con formato chileno', () => {
    render(
      <Producto
        id={4}
        nombre="Tarjeta Gráfica Asus TUF RTX 4070"
        marca="Asus"
        categoria="Hardware PC"
        precio={699990}
        stock={2}
        imagen="/productos/tarjeta-grafica.svg"
        enCarrito={0}
      />,
    );

    expect(screen.getByText('$699.990')).toBeTruthy();
  });

  /* Caso de Prueba 4: Con 3 unidades o menos aparece la etiqueta roja */
  it('muestra "¡Últimas unidades!" cuando el stock es crítico', () => {
    render(
      <Producto
        id={2}
        nombre="Teclado Mecánico Corsair K70"
        marca="Corsair"
        categoria="Periféricos"
        precio={89990}
        stock={3}
        imagen="/productos/teclado.svg"
        enCarrito={0}
      />,
    );

    const etiqueta = screen.getByText('¡Últimas 3 unidades!');

    expect(etiqueta.className).toContain('bg-danger');
  });

  /* Caso de Prueba 5: Sin stock el botón se desactiva */
  it('desactiva el botón cuando no hay stock', () => {
    render(
      <Producto
        id={9}
        nombre="Mousepad XXL Razer Goliathus"
        marca="Razer"
        categoria="Accesorios"
        precio={19990}
        stock={0}
        imagen="/productos/mousepad.svg"
        enCarrito={0}
      />,
    );

    expect(screen.getByText('Sin stock')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'Agregar al carrito' }).disabled,
    ).toBeTrue();
  });

  /* Caso de Prueba 6: Si el carrito ya tiene todo el stock, no deja agregar más */
  it('desactiva el botón cuando el carrito tiene todas las unidades', () => {
    render(
      <Producto
        id={7}
        nombre="Silla Gamer Secretlab Titan"
        marca="Secretlab"
        categoria="Sillas Gamer"
        precio={459990}
        stock={1}
        imagen="/productos/silla-secretlab.svg"
        enCarrito={1}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Agregar al carrito' }).disabled,
    ).toBeTrue();
  });

  /* Caso de Prueba 7: Si la imagen falla, el estado failed muestra el reemplazo */
  it('muestra "Imagen no disponible" cuando la imagen no carga', () => {
    render(
      <Producto
        id={1}
        nombre="Mouse Gamer Logitech G502"
        marca="Logitech"
        categoria="Periféricos"
        precio={29990}
        stock={15}
        imagen="/no-existe.png"
        enCarrito={0}
      />,
    );

    // fireEvent.error simula que el navegador no pudo cargar la imagen.
    fireEvent.error(screen.getByRole('img'));

    expect(screen.getByText('Imagen no disponible')).toBeTruthy();
  });

  /* Caso de Prueba 8 (mock): al hacer clic se llama a onAgregar con el id */
  it('llama a onAgregar con el id del producto', () => {
    // jasmine.createSpy crea una función falsa que recuerda cómo fue llamada.
    const onAgregar = jasmine.createSpy('onAgregar');
    render(
      <Producto
        id={3}
        nombre="Audífonos HyperX Cloud II"
        marca="HyperX"
        categoria="Periféricos"
        precio={59990}
        stock={8}
        imagen="/productos/audifonos.svg"
        enCarrito={0}
        onAgregar={onAgregar}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    expect(onAgregar).toHaveBeenCalledWith(3);
  });
});
