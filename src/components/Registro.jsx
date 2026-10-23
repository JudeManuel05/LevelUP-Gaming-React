/** Formulario de registro: valida en el navegador con mensajes en español. */
import { useState } from 'react';
export default function Registro() {
  // El texto de confirmación es estado: actualizarlo refresca el mensaje visible.
  const [status, setStatus] = useState('');

  // Conserva la validación nativa, pero reemplaza sus textos por los de la Evaluación 1.
  function handleInvalid(event) {
    const field = event.target;
    // Quitar el error personalizado permite evaluar las reglas nativas del campo.
    field.setCustomValidity('');

    if (field.validity.valueMissing) {
      if (field.name === 'nombre') field.setCustomValidity('Ingresa tu nombre.');
      if (field.name === 'rut') field.setCustomValidity('Ingresa tu RUT.');
      if (field.name === 'telefono') field.setCustomValidity('Ingresa tu teléfono.');
      if (field.name === 'correo') field.setCustomValidity('Ingresa tu correo.');
      if (field.name === 'clave') field.setCustomValidity('Ingresa tu contraseña.');
    } else if (field.validity.typeMismatch || field.validity.patternMismatch) {
      if (field.name === 'nombre') {
        field.setCustomValidity('El nombre debe tener al menos 3 letras.');
      }
      if (field.name === 'rut') {
        field.setCustomValidity('El RUT debe ir sin puntos y con guion. Ej: 12345678-9');
      }
      if (field.name === 'telefono') {
        field.setCustomValidity('El teléfono debe tener 9 números. Ej: 912345678');
      }
      if (field.name === 'correo') {
        field.setCustomValidity('El correo debe tener @ y un punto. Ej: juan@gmail.com');
      }
      if (field.name === 'clave') {
        field.setCustomValidity('La contraseña debe tener al menos 6 caracteres.');
      }
    }
  }

  function handleInput(event) {
    // Elimina el error anterior para que el navegador pueda validar el nuevo valor.
    event.target.setCustomValidity('');
    setStatus('');
  }

  // El navegador verifica required y pattern antes de ejecutar este handler.
  function handleSubmit(event) {
    // Impide el envío HTML tradicional y la recarga; React gestiona el resultado.
    event.preventDefault();
    const form = event.target;
    // Igual que en la Evaluación 1 se guarda en el navegador (sin la contraseña).
    localStorage.setItem('nombre', form.nombre.value);
    localStorage.setItem('correo', form.correo.value);
    setStatus(`✅ Usuario creado. ¡Bienvenido, ${form.nombre.value}!`);
    form.reset();
  }

  return (
    <section id="registro" className="section-space">
      <div className="container">
        <div className="formulario">
          <h2 className="mb-3 text-center">Crea tu cuenta</h2>
          {/* onInvalid captura errores de los campos; onInput limpia errores al editar. */}
          <form onSubmit={handleSubmit} onInvalid={handleInvalid} onInput={handleInput}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Ej: Juan Pérez"
                autoComplete="name"
                required
                // Mínimo 3 caracteres.
                pattern=".{3,}"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rut" className="form-label">
                RUT
              </label>
              <input
                id="rut"
                name="rut"
                className="form-control"
                placeholder="Ej: 12345678-9"
                required
                // 7 u 8 números, guion y dígito verificador (número o K).
                pattern={'[0-9]{7,8}-[0-9kK]'}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                className="form-control"
                placeholder="Ej: 912345678"
                autoComplete="tel"
                required
                pattern={'[0-9]{9}'}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                className="form-control"
                placeholder="Ej: juan@gmail.com"
                autoComplete="email"
                required
                // Exige usuario@dominio.extensión sin espacios; no verifica existencia.
                pattern={'[^\\s@]+@[^\\s@]+\\.[^\\s@]+'}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clave" className="form-label">
                Contraseña
              </label>
              <input
                id="clave"
                name="clave"
                type="password"
                className="form-control"
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                required
                pattern=".{6,}"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Crear usuario
            </button>
            {/* role=status anuncia el cambio de mensaje a lectores de pantalla. */}
            <p className="text-success fw-bold mt-3" role="status">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
