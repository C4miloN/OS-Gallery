# Manga Gallery

Galería de imágenes estilo página de manga con miniaturas dinámicas, bordes diagonales y visor de imagen completa con animación.

## Características

- **Layout dinámico**: Las imágenes se organizan según su proporción (ancho/alto), creando un efecto de página de manga con paneles irregulares
- **Bordes diagonales**: 6 estilos de recortes usando `clip-path` para simular paneles de manga
- **Lightbox animado**: Click en una imagen para verla en grande con animación de escala
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Cierre fácil**: Click fuera de la imagen, botón X, o tecla Escape

## Uso

### Agregar imágenes

Edita el array `images` en `gallery.js`:

```js
const images = [
  { url: "https://tu-imagen.com/foto.jpg", width: 800, height: 1200 },
  { url: "https://tu-imagen.com/otra.jpg", width: 600, height: 900 },
];
```

- `url`: Link directo a la imagen
- `width`: Ancho proporcional de la imagen (usado para calcular el espacio en el grid)
- `height`: Alto proporcional de la imagen

### Ejecutar

Simplemente abre `index.html` en tu navegador. No requiere servidor ni dependencias.

## Estructura

```
Manga-gallery/
├── index.html    # Página principal
├── styles.css    # Estilos y animaciones
├── gallery.js    # Lógica y datos
└── README.md     # Este archivo
```

## Personalización

### Cambiar estilos de bordes

Los 6 tipos de `clip-path` están en `styles.css` (clases `.clip-diagonal-1` a `.clip-diagonal-6`). Puedes modificarlos o agregar nuevos.

### Ajustar tamaño del grid

En `styles.css`, modifica:
- `grid-template-columns`: tamaño mínimo de columnas
- `grid-auto-rows`: altura de cada fila
- `gap`: espacio entre imágenes

### Cambiar animación del lightbox

En `styles.css`, busca `.lightbox-image` y ajusta la propiedad `transition`.
