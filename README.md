# Tripleten web_project_around_es

**Proyecto: Around The U.S.**

### Descripción del Proyecto

Around The U.S. es una página web interactiva donde los usuarios pueden explorar y compartir fotografías de lugares interesantes a lo largo de los Estados Unidos. La página permite gestionar un perfil de usuario, agregar nuevas tarjetas con imágenes, dar "Me gusta" a las tarjetas existentes, eliminarlas y ver versiones ampliadas de las imágenes en ventanas emergentes (modales). Todos los formularios cuentan con validación en tiempo real con mensajes de error personalizados.

### Funcionalidad

- **Editar perfil**: El usuario puede modificar su nombre y descripción a través de un modal con formulario validado.
- **Agregar tarjetas**: El usuario puede añadir nuevas tarjetas con un título e imagen personalizada desde un modal con validación.
- **Eliminar tarjetas**: Cada tarjeta tiene un botón para eliminarla del DOM.
- **Me gusta**: El usuario puede marcar y desmarcar su favorito en cada tarjeta alternando el color del corazón.
- **Vista ampliada**: Al hacer clic en la imagen de una tarjeta, se abre un modal con la imagen en tamaño grande y su título.
- **Tarjetas dinámicas**: Las tarjetas iniciales se generan dinámicamente desde un array de datos usando un elemento `<template>` de HTML.
- **Parámetros por defecto**: Si una tarjeta no tiene nombre o imagen, se muestra "Sin título" y una imagen de marcador de posición.
- **Cierre de modales**: Los modales se cierran con el botón X, haciendo clic fuera del contenido o pulsando la tecla Esc.
- **Validación de formularios**: Los campos se validan en tiempo real usando `ValidityState`. El botón de envío se deshabilita automáticamente si algún campo no es válido.

### Tecnologías y Técnicas Utilizadas

- **HTML5 y CSS3**: Estructura y diseño utilizando la metodología BEM y organización por carpetas en el directorio `blocks`.
- **JavaScript (ES6+)**: Manipulación del DOM, manejo de eventos, módulos ES6 (`import`/`export`), template literals, parámetros predeterminados y funciones reutilizables.
- **Módulos JS**: La lógica de validación está separada en `validate.js` y se importa en `index.js` usando `type="module"`.
- **Validación**: Funciones universales `setEventListeners()` y `resetValidation()` que usan `ValidityState` del navegador para validar campos en tiempo real.
- **Elemento `<template>`**: Generación dinámica de tarjetas mediante clonación del template HTML.
- **Modales**: Apertura y cierre de ventanas emergentes con funciones reutilizables `openModal()` y `closeModal()`, incluyendo cierre con Esc y clic fuera.
- **Git y GitHub**: Control de versiones y despliegue del proyecto en GitHub Pages.

### Estructura de Archivos

- **index.html**: Punto de entrada principal con el marcado base, elementos `<template>` y formularios con spans de error.
- **scripts/index.js**: Lógica principal del proyecto: datos iniciales, funciones de tarjetas, modales y event listeners.
- **scripts/validate.js**: Módulo de validación universal exporta `setEventListeners` y `resetValidation`.
- **pages/index.css**: Archivo CSS principal que importa normalize y todos los bloques.
- **blocks/**: Directorio con los archivos CSS segmentados por componentes (card, profile, popup, etc.).
- **images/**: Contiene todos los recursos visuales e iconos del proyecto.
- **vendor/**: Fuentes e Inter y normalize.css.

### Enlace al Proyecto

[GitHub Pages](https://fangarita2-rgb.github.io/web_project_around_es/)
