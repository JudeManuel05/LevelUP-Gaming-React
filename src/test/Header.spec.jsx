import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Componente Header', () => {
  afterEach(() => {
    cleanup();
  });

  /* Caso de Prueba 18: Muestra la cantidad recibida por props */
  it('muestra la cantidad de productos del carrito', () => {
    render(<Header cantidadCarrito={4} />);

    expect(screen.getByLabelText('Productos en el carrito').textContent).toBe('4');
  });

  /* Caso de Prueba 19: El botón del menú abre y cierra el menú móvil */
  it('abre y cierra el menú móvil', () => {
    render(<Header cantidadCarrito={0} />);
    const boton = screen.getByRole('button', { name: 'Abrir o cerrar menú' });

    expect(boton.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(boton);
    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(document.getElementById('menu-principal').className).toContain('show');

    // Al elegir una sección, el menú se cierra.
    fireEvent.click(screen.getByRole('link', { name: 'Productos' }));
    expect(boton.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(boton);
    fireEvent.click(screen.getByRole('link', { name: /Carrito/ }));
    expect(boton.getAttribute('aria-expanded')).toBe('false');
  });
});
