# LevelUp Gaming - Tienda Gamer en React

Evaluación Parcial 2 de DSY1104 Desarrollo Fullstack II (Duoc UC). La tienda LevelUp
Gaming de la Evaluación 1 (HTML, CSS, JavaScript y Bootstrap) se migró a React y Vite,
siguiendo la organización del ejemplo del curso: componentes, props, listas, estado,
eventos, diseño responsive con Bootstrap y CSS propio, y pruebas unitarias con Jasmine y
Karma.

## Desarrollo

```sh
npm install
npm run dev
```

El servidor muestra la dirección local en la terminal. La página de administración está
en `/admin.html`.

## Pruebas unitarias

```sh
npm test
```

Karma ejecuta con Jasmine los archivos `src/test/*.spec.jsx` en Chrome sin ventana
(ChromeHeadless). Al terminar, abre `coverage/html/index.html` para ver el informe de
cobertura.

## Comprobaciones

```sh
npm run lint
npm run build
npm run format:check
```

## Organización

- `src/App.jsx`: compone las secciones y guarda el estado del carrito (agregar, eliminar y vaciar).
- `src/components/Header.jsx`: navegación, menú móvil con React y contador del carrito.
- `src/components/Logo.jsx`: logo compartido por Header, Footer y Admin.
- `src/components/Inicio.jsx`: portada y marcas asociadas.
- `src/components/Ofertas.jsx`: ofertas relámpago con precio anterior y descuento.
- `src/components/Catalogo.jsx`: filtro por categoría y grilla responsive de productos.
- `src/components/Producto.jsx`: tarjeta con precio, estado del stock, reemplazo para imágenes que fallan y botón Agregar al carrito.
- `src/components/Carrito.jsx`: productos agregados, total, eliminar y vaciar.
- `src/components/Blog.jsx`: artículos de noticias.
- `src/components/Registro.jsx`: formulario con validación nativa y mensajes en español.
- `src/components/Footer.jsx`: enlaces, contacto y año actual.
- `src/admin/`: página independiente con Login, inventario con stock crítico y formulario para agregar productos.
- `src/data/productos.json`: catálogo; cada producto tiene `id`, `nombre`, `categoria`, `marca`, `precio`, `stock` e `imagen`.
- `public/productos/`: imágenes de los productos.
- `src/test/`: pruebas unitarias.

## Reglas de negocio

- Stock de 3 unidades o menos: etiqueta roja en la tienda y alerta en Admin.
- No se pueden agregar al carrito más unidades que el stock disponible.
- RUT sin puntos y con guion, teléfono de 9 números, contraseña de al menos 6 caracteres.

El login de Admin es de demostración: no comprueba credenciales y al recargar vuelve al
login. El inventario se modifica solo en memoria; el JSON no cambia.
