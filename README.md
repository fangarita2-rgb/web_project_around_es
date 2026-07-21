# Around The U.S. — Proyecto 8

**Proyecto: Around The U.S. (Refactorización POO con TypeScript)**

### Descripción del Proyecto

<<<<<<< HEAD
Around The U.S. es una página web interactiva donde los usuarios pueden explorar y compartir fotografías de lugares interesantes a lo largo de los Estados Unidos. La página permite gestionar un perfil de usuario, agregar nuevas tarjetas con imágenes, dar "Me gusta" a las tarjetas existentes, eliminarlas y ver versiones ampliadas de las imágenes en ventanas emergentes (modales). Todos los formularios cuentan con validación en tiempo real con mensajes de error personalizados.
=======
Around The U.S. es una página web interactiva donde los usuarios pueden explorar y compartir fotografías de lugares interesantes a lo largo de los Estados Unidos. En esta etapa del proyecto, se realizó una refactorización completa del código utilizando Programación Orientada a Objetos (POO) y TypeScript, organizando toda la lógica en clases independientes y reutilizables.
>>>>>>> 23f913a (feat: refactorizar proyecto con TypeScript y POO - Proyecto 8)

### Funcionalidad

- **Editar perfil**: El usuario puede modificar su nombre y descripción a través de un modal con formulario validado.
<<<<<<< HEAD
- **Agregar tarjetas**: El usuario puede añadir nuevas tarjetas con un título e imagen personalizada desde un modal con validación.
=======
- **Agregar tarjetas**: El usuario puede añadir nuevas tarjetas con título e imagen personalizada desde un modal con validación en tiempo real.
>>>>>>> 23f913a (feat: refactorizar proyecto con TypeScript y POO - Proyecto 8)
- **Eliminar tarjetas**: Cada tarjeta tiene un botón para eliminarla del DOM.
- **Me gusta**: El usuario puede marcar y desmarcar favoritos en cada tarjeta.
- **Vista ampliada**: Al hacer clic en la imagen de una tarjeta, se abre un modal con la imagen en tamaño grande y su título.
<<<<<<< HEAD
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
=======
- **Validación de formularios**: Los campos se validan en tiempo real usando `ValidityState`. El botón de envío se deshabilita si algún campo no es válido.
- **Cierre de modales**: Los modales se cierran con el botón X, haciendo clic fuera del contenido o pulsando la tecla Esc.

### Arquitectura POO — Clases

- **`FormValidator`**: Valida los campos de un formulario en tiempo real. Métodos públicos: `enableValidation()` y `resetValidation()`.
- **`Card`**: Crea elementos de tarjeta individuales a partir de datos. Aplica acoplamiento débil pasando el callback `handleCardClick`.
- **`Section`**: Renderiza listas de elementos en un contenedor del DOM.
- **`Popup`**: Clase base para ventanas modales. Maneja apertura, cierre con Esc y clic fuera.
- **`PopupWithImage`**: Extiende `Popup`. Muestra imágenes ampliadas con título.
- **`PopupWithForm`**: Extiende `Popup`. Maneja envío de formularios y reseteo al cerrar.
- **`UserInfo`**: Gestiona la lectura y escritura de los datos del perfil de usuario en el DOM.

### Tecnologías y Técnicas Utilizadas

- **HTML5 y CSS3**: Estructura y diseño con metodología BEM.
- **TypeScript (ES6+)**: Tipado estático, interfaces, clases, herencia, genéricos y módulos ES6.
- **Programación Orientada a Objetos**: Encapsulamiento, herencia, acoplamiento débil y responsabilidad única por clase.
- **Validación con `ValidityState`**: Validación nativa del navegador con mensajes personalizados.
- **Git y GitHub Pages**: Control de versiones y despliegue.
>>>>>>> 23f913a (feat: refactorizar proyecto con TypeScript y POO - Proyecto 8)

### Enlace al Proyecto

<<<<<<< HEAD
- **index.html**: Punto de entrada principal con el marcado base, elementos `<template>` y formularios con spans de error.
- **scripts/index.js**: Lógica principal del proyecto: datos iniciales, funciones de tarjetas, modales y event listeners.
- **scripts/validate.js**: Módulo de validación universal exporta `setEventListeners` y `resetValidation`.
- **pages/index.css**: Archivo CSS principal que importa normalize y todos los bloques.
- **blocks/**: Directorio con los archivos CSS segmentados por componentes (card, profile, popup, etc.).
- **images/**: Contiene todos los recursos visuales e iconos del proyecto.
- **vendor/**: Fuentes e Inter y normalize.css.
=======
[GitHub Pages](https://fangarita2-rgb.github.io/web_project_around_es/)
>>>>>>> 23f913a (feat: refactorizar proyecto con TypeScript y POO - Proyecto 8)
