import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Registro from '../components/Registro';

describe('Componente Registro', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  /* Caso de Prueba 20: Los campos vacíos muestran los mensajes de la Evaluación 1 */
  it('muestra "Ingresa tu nombre." si el formulario está vacío', () => {
    render(<Registro />);

    // Al presionar el botón, el navegador valida los campos required.
    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }));

    expect(screen.getByLabelText('Nombre').validationMessage).toBe('Ingresa tu nombre.');
    expect(screen.getByLabelText('RUT').validationMessage).toBe('Ingresa tu RUT.');
  });

  /* Caso de Prueba 21: Un RUT con puntos no cumple el pattern */
  it('muestra un mensaje si el RUT tiene puntos', () => {
    render(<Registro />);
    const rut = screen.getByLabelText('RUT');

    fireEvent.change(rut, { target: { value: '12.345.678-9' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }));

    expect(rut.validationMessage).toBe(
      'El RUT debe ir sin puntos y con guion. Ej: 12345678-9',
    );
  });

  /* Caso de Prueba 22: Teléfono, correo y contraseña con formato incorrecto */
  it('muestra los mensajes de teléfono, correo y contraseña inválidos', () => {
    render(<Registro />);

    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'juan' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Al' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }));

    expect(screen.getByLabelText('Teléfono').validationMessage).toBe(
      'El teléfono debe tener 9 números. Ej: 912345678',
    );
    expect(screen.getByLabelText('Correo').validationMessage).toBe(
      'El correo debe tener @ y un punto. Ej: juan@gmail.com',
    );
    expect(screen.getByLabelText('Contraseña').validationMessage).toBe(
      'La contraseña debe tener al menos 6 caracteres.',
    );
    expect(screen.getByLabelText('Nombre').validationMessage).toBe(
      'El nombre debe tener al menos 3 letras.',
    );
  });

  /* Caso de Prueba 23: Con datos válidos guarda en localStorage y muestra el mensaje */
  it('crea el usuario con datos válidos', () => {
    render(<Registro />);

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Juan Pérez' },
    });
    fireEvent.change(screen.getByLabelText('RUT'), { target: { value: '12345678-9' } });
    fireEvent.change(screen.getByLabelText('Teléfono'), {
      target: { value: '912345678' },
    });
    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'juan@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'secreto1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }));

    expect(screen.getByRole('status').textContent).toBe(
      '✅ Usuario creado. ¡Bienvenido, Juan Pérez!',
    );
    expect(localStorage.getItem('nombre')).toBe('Juan Pérez');
    expect(localStorage.getItem('correo')).toBe('juan@gmail.com');

    // Al volver a escribir, onInput limpia el mensaje anterior.
    fireEvent.input(screen.getByLabelText('Nombre'), { target: { value: 'Juan' } });
    expect(screen.getByRole('status').textContent).toBe('');
  });
});
