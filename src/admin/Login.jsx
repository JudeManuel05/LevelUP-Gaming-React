/** Login didáctico: permite entrar sin validar campos ni credenciales. */
export default function Login({ onLogin }) {
  // onLogin es una prop de tipo función definida en Admin, dueño del estado de acceso.
  function handleSubmit(event) {
    event.preventDefault();
    // Notifica al padre sin comprobar usuario ni contraseña: ejercicio de comunicación.
    onLogin();
  }

  return (
    <section className="admin-login card shadow-sm">
      <div className="card-body p-4 p-md-5">
        <p className="eyebrow">ACCESO ADMIN</p>
        <h1 className="h2">Iniciar sesión</h1>
        <p className="text-secondary">
          Acceso de demostración: puedes entrar con cualquier dato o dejar los campos
          vacíos.
        </p>
        {/* noValidate desactiva la validación nativa en este login de demostración. */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">
              Usuario
            </label>
            <input
              id="usuario"
              name="usuario"
              className="form-control"
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clave" className="form-label">
              Contraseña
            </label>
            <input
              id="clave"
              name="clave"
              type="password"
              className="form-control"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Entrar al panel
          </button>
        </form>
      </div>
    </section>
  );
}
