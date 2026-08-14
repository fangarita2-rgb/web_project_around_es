# Around The U.S. — Proyecto 9

**Proyecto: Around The U.S. (Integración de API)**

### Descripción del Proyecto

Around The U.S. es una página web interactiva donde los usuarios pueden explorar y compartir fotografías de lugares interesantes a lo largo de los Estados Unidos. En esta etapa del proyecto se integró una API REST real, conectando la aplicación a un servidor para cargar y guardar datos de forma persistente. Se agregaron nuevas funcionalidades como edición de avatar, confirmación de eliminación de tarjetas y estados de carga en los formularios.

### Funcionalidad

- **Perfil desde la API**: Los datos del usuario (nombre, descripción, avatar) se cargan desde el servidor al iniciar la página.
- **Editar perfil**: El usuario puede modificar su nombre y descripción. Los cambios se guardan en el servidor.
- **Editar avatar**: El usuario puede actualizar su foto de perfil haciendo clic sobre ella. El cambio se guarda en el servidor.
- **Tarjetas desde la API**: Las tarjetas iniciales se cargan desde el servidor. Solo se muestran después de recibir el `id` del usuario.
- **Agregar tarjetas**: El usuario puede añadir nuevas tarjetas con título e imagen. Se guardan en el servidor.
- **Eliminar tarjetas**: Solo el propietario puede eliminar sus tarjetas. Aparece un popup de confirmación antes de eliminar.
- **Me gusta**: El usuario puede dar y quitar "Me gusta" a las tarjetas. El estado se sincroniza con el servidor.
- **Vista ampliada**: Al hacer clic en la imagen de una tarjeta se abre un modal con la imagen en grande.
- **Estados de carga**: El botón de los formularios muestra "Guardando..." o "Creando..." mientras se espera la respuesta del servidor.
- **Validación de formularios**: Los campos se validan en tiempo real. El botón de envío se deshabilita si algún campo no es válido.
- **Cierre de modales**: Con el botón X, clic fuera o tecla Esc.

### Tecnologías y Técnicas Utilizadas

- **HTML5 y CSS3**: Estructura y diseño con metodología BEM.
- **TypeScript (ES2020)**: Tipado estático, interfaces, clases, herencia, genéricos y módulos ES6.
- **API REST**: Integración con servidor mediante `fetch`, `async/await`, `Promise.all` y manejo de errores con `try/catch`.
- **Programación Orientada a Objetos**: Encapsulamiento, herencia, acoplamiento débil y responsabilidad única por clase.
- **Validación con `ValidityState`**: Validación nativa del navegador con mensajes personalizados.
- **Git y GitHub Pages**: Control de versiones y despliegue.

### Arquitectura POO — Clases

- **`Api`** — Todas las solicitudes al servidor: GET/PATCH/POST/DELETE/PUT con `async/await` y verificación de `res.ok`.
- **`Card`** — Crea tarjetas individuales. Verifica si el usuario es propietario para mostrar el botón de eliminar. Like/unlike via API.
- **`Section`** — Renderiza listas de elementos en un contenedor del DOM.
- **`Popup`** — Clase base: apertura, cierre con Esc, clic fuera y botón X.
- **`PopupWithImage`** — Extiende `Popup`. Muestra imágenes ampliadas.
- **`PopupWithForm`** — Extiende `Popup`. Maneja envío de formularios y estado de carga.
- **`PopupWithConfirmation`** — Extiende `Popup`. Confirma eliminación de tarjetas con handler dinámico.
- **`UserInfo`** — Gestiona nombre, descripción y avatar del usuario en el DOM.
- **`FormValidator`** — Validación universal con `enableValidation()` y `resetValidation()`.

### Enlace al Proyecto

[GitHub Pages](https://fangarita2-rgb.github.io/web_project_around_es/)
