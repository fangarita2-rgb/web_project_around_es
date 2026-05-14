# Tripleten web_project_around_es

**Proyecto: Around The U.S.**

### Descripción del Proyecto

Around The U.S. es una página web interactiva donde los usuarios pueden explorar y compartir fotografías de lugares interesantes a lo largo de los Estados Unidos. La página permite gestionar un perfil de usuario, agregar nuevas tarjetas con imágenes, dar "Me gusta" a las tarjetas existentes, eliminarlas y ver versiones ampliadas de las imágenes en ventanas emergentes (modales).

### Funcionalidad

- **Editar perfil**: El usuario puede modificar su nombre y descripción a través de un modal con formulario.
- **Agregar tarjetas**: El usuario puede añadir nuevas tarjetas con un título e imagen personalizada desde un modal.
- **Eliminar tarjetas**: Cada tarjeta tiene un botón para eliminarla del DOM.
- **Me gusta**: El usuario puede marcar y desmarcar su favorito en cada tarjeta alternando el color del corazón.
- **Vista ampliada**: Al hacer clic en la imagen de una tarjeta, se abre un modal con la imagen en tamaño grande y su título.
- **Tarjetas dinámicas**: Las tarjetas iniciales se generan dinámicamente desde un array de datos usando un elemento `<template>` de HTML.
- **Parámetros por defecto**: Si una tarjeta no tiene nombre o imagen, se muestra "Sin título" y una imagen de marcador de posición.

### Tecnologías y Técnicas Utilizadas

- **HTML5 y CSS3**: Estructura y diseño utilizando la metodología BEM y organización por carpetas en el directorio `blocks`.
- **JavaScript (ES6)**: Manipulación del DOM, manejo de eventos, template literals, parámetros predeterminados y funciones reutilizables.
- **Elemento `<template>`**: Generación dinámica de tarjetas mediante clonación del template HTML.
- **Modales**: Apertura y cierre de ventanas emergentes con funciones reutilizables `openModal()` y `closeModal()`.
- **Git y GitHub**: Control de versiones y despliegue del proyecto en GitHub Pages.

### Estructura de Archivos

- **index.html**: Punto de entrada principal con el marcado base y los elementos `<template>`.
- **scripts/index.js**: Contiene toda la lógica del proyecto: datos iniciales, funciones de tarjetas, modales y event listeners.
- **blocks/**: Directorio con los archivos CSS segmentados por componentes (card, profile, popup, etc.).
- **images/**: Contiene todos los recursos visuales e iconos del proyecto.
