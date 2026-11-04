# 🌴 Cuenta Atrás GTA VI — Experiencia Vice City 🌆

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Sin dependencias](https://img.shields.io/badge/dependencias-0-ff3d8b?style=for-the-badge)
![Responsive](https://img.shields.io/badge/responsive-sí-35d6ff?style=for-the-badge)

> Una página web con cuenta atrás hacia el lanzamiento de **Grand Theft Auto VI**, diseñada como si fuera una web promocional de un videojuego AAA. Neón rosa, atardeceres tropicales, skyline, palmeras y mucha vida nocturna: entras directamente en **Vice City**. 🏝️

---

## 📑 Índice

- [✨ Características](#-características)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [🚀 Cómo ejecutarlo](#-cómo-ejecutarlo)
- [⚙️ Configuración (fechas y ajustes)](#️-configuración-fechas-y-ajustes)
- [⏱️ Cómo funciona el contador](#️-cómo-funciona-el-contador)
- [🎨 Temas y personalización](#-temas-y-personalización)
- [🎉 Modo día de lanzamiento](#-modo-día-de-lanzamiento)
- [🧪 Probar sin esperar a noviembre](#-probar-sin-esperar-a-noviembre)
- [🖼️ Imágenes y audio](#️-imágenes-y-audio)
- [⚡ Rendimiento y accesibilidad](#-rendimiento-y-accesibilidad)
- [📱 Diseño responsive](#-diseño-responsive)
- [🌍 Publicarlo en GitHub Pages](#-publicarlo-en-github-pages)
- [🛠️ Solución de problemas](#️-solución-de-problemas)
- [📜 Créditos y aviso legal](#-créditos-y-aviso-legal)

---

## ✨ Características

| | Qué incluye |
|---|---|
| 🎬 **Entrada cinematográfica** | Telón que se abre sobre "VICE CITY · LEONIDA" y aparición escalonada del título, el contador y la barra. |
| 🔢 **Contador en tiempo real** | Días, horas, minutos y segundos en bloques de cristal con efecto neón y animación al cambiar cada número. |
| 📊 **Barra de progreso** | Porcentaje con 2 decimales desde la fecha del anuncio hasta el lanzamiento. No se reinicia al recargar. |
| 🌅 **Fondo con profundidad** | Imágenes del juego que rotan con zoom lento, sol rayado, skyline generado por código, palmeras, partículas y parallax suave con el ratón. |
| 🃏 **Información del juego** | Tarjetas con iconos. Lo **oficial** está marcado como tal y los **rumores** van aparte como "Sin confirmar". |
| 👥 **Protagonistas** | Tarjetas de Lucía y Jason con efectos al pasar el ratón. |
| ▶️ **Tráilers** | Enlaces a los vídeos oficiales de YouTube con miniaturas. |
| 🖼️ **Galería en mosaico** | Composición tipo revista digital con visor ampliado: flechas, tecla `Esc` y zoom. |
| 🎨 **5 temas + modo claro/oscuro** | Cambian colores, fondos, luces, tarjetas y detalles. Se guardan al volver. |
| 🔊 **Audio ambiente** | Música de fondo opcional, sonido de tick y control de volumen. |
| 🏁 **Modo lanzamiento** | Al llegar a cero aparece **WELCOME TO LEONIDA** con destello y fuegos de partículas. |
| ♿ **Movimiento reducido** | Respeta la preferencia del sistema y tiene su propio interruptor. |

---

## 📂 Estructura del proyecto

```
Cuenta-Atras-GTA-VI/
├── 📄 index.html            # Estructura de la página
├── 📁 css/
│   └── style.css            # Estilos, temas, animaciones y responsive
├── 📁 js/
│   └── script.js            # Contador, ajustes, partículas, galería…
├── 📁 assets/
│   ├── images/              # Imágenes originales (PNG) y logo
│   │   └── opt/             # Versiones optimizadas en WebP (las que usa la web)
│   └── sounds/
│       ├── ambient.mp3      # Música ambiente
│       └── tick.mp3         # Sonido del segundero
├── 📁 _original/            # Copia de seguridad de la versión anterior
└── 📄 README.md
```

> 💡 No hay `node_modules`, ni `package.json`, ni proceso de compilación. Es HTML, CSS y JavaScript puro.

---

## 🚀 Cómo ejecutarlo

### Opción 1 · Abrir el archivo directamente
Haz doble clic en `index.html`. Funciona en cualquier navegador moderno. 🖱️

### Opción 2 · Servidor local (recomendado)
Con un servidor local se comporta igual que en producción:

```bash
# Con Python
python3 -m http.server 8000

# o con Node
npx serve .
```

Después abre `http://localhost:8000` en tu navegador. 🌐

### Navegadores compatibles
La página usa `color-mix()`, así que necesita un navegador actual: **Chrome / Edge 111+, Safari 16.2+ o Firefox 113+**.

---

## ⚙️ Configuración (fechas y ajustes)

Todo lo configurable está **centralizado** en el objeto `CONFIG`, al principio de `js/script.js`:

```js
const CONFIG = {
  launch: '2026-11-19T00:00:00',  // fecha y hora de lanzamiento (hora local del visitante)
  start:  '2023-12-01T00:00:00',  // inicio de la barra de progreso
  locale: 'es-ES',                // idioma para formatear fechas
  slides: [...],                  // imágenes de fondo rotativas
  slideMs: 14000,                 // milisegundos entre fondos
  particles: { off: 0, low: 26, high: 64 },  // número de partículas por nivel
  gallery: [...]                  // imágenes y descripciones de la galería
};
```

### 📅 Si cambia la fecha oficial
Edita solo `launch`. La cuenta atrás, la barra de progreso, la etiqueta de fecha y la tarjeta de información se actualizan solas. ✅

```js
launch: '2026-11-19T00:00:00'   // formato AAAA-MM-DDTHH:MM:SS
```

> ⏰ La fecha se interpreta en la **hora local del visitante**, igual que hacía la versión original del proyecto.

### 🖼️ Cambiar las imágenes de la galería
Cada entrada es `[número de imagen, descripción]`. Los archivos se buscan en `assets/images/opt/` como `N.webp` (grande) y `N-sm.webp` (miniatura).

---

## ⏱️ Cómo funciona el contador

1. Se calcula `tiempo restante = fecha de lanzamiento − ahora`.
2. Se obtienen días, horas, minutos y segundos, y se muestran con ceros a la izquierda (días con 3 cifras).
3. Cada número que cambia ejecuta una pequeña animación.
4. La actualización se sincroniza con el cambio real de segundo del reloj.
5. El tiempo restante **nunca baja de 0**: no se muestran números negativos.

### 📈 Barra de progreso

```
progreso (%) = (ahora − fecha de inicio) / (fecha de lanzamiento − fecha de inicio) × 100
```

Como se calcula con fechas fijas, el valor es el mismo aunque recargues la página o abras la web en otro dispositivo.

---

## 🎨 Temas y personalización

Pulsa el botón **⚙️ Ajustes** de la cabecera para abrir el panel.

### 🎭 Temas

| Tema | Ambiente |
|---|---|
| 🌅 **Vice City Sunset** | Rosa, morado y naranja de atardecer (por defecto). |
| 🌃 **Neon Night** | Magenta y cian eléctrico sobre noche cerrada. |
| 🏖️ **Miami Beach** | Turquesa, coral y amarillo tropical. |
| 🕶️ **Dark Criminal** | Rojo oscuro, dorado apagado y gris. Tono más sombrío. |
| 📼 **Retro 80s** | Violeta, rosa y amarillo, con rejilla animada en el suelo. |

### 🎛️ Otros ajustes

- 🌙 / ☀️ **Modo oscuro y claro.**
- ✨ **Intensidad de efectos:** sin efectos, suaves o máximos. Controla partículas, brillos y líneas de escaneo.
- 🐢 **Animaciones:** completas o reducidas.
- 🔊 **Volumen** del audio.

Tus elecciones se guardan en el navegador (`localStorage`, clave `gta6-vicecity-settings`) y se restauran al volver.

---

## 🎉 Modo día de lanzamiento

Cuando el contador llega a cero, la página cambia sola, sin recargar:

1. 🔢 El contador se oculta.
2. 💥 Se produce un destello de luz y una explosión de partículas.
3. 🌴 Aparece el mensaje **WELCOME TO LEONIDA** con animación.
4. 📊 La barra de progreso muestra **100 %**.
5. 🏷️ El título de la pestaña pasa a "WELCOME TO LEONIDA".

Funciona igual si alguien abre la página **después** de la fecha de lanzamiento.

---

## 🧪 Probar sin esperar a noviembre

Puedes añadir un parámetro a la URL para ver el comportamiento sin tocar el código:

| URL | Resultado |
|---|---|
| `index.html?demo=launch` | Muestra directamente el modo lanzamiento. |
| `index.html?demo=soon` | Hace una cuenta atrás de 8 segundos y activa el modo lanzamiento en directo. |

> 🧹 Si no quieres dejar esta función en producción, elimina la línea de `demo` en `js/script.js`.

---

## 🖼️ Imágenes y audio

### 🖼️ Imágenes
- Las imágenes originales siguen en `assets/images/` como PNG.
- La web usa versiones **WebP optimizadas** en `assets/images/opt/` (aprox. 2 MB en total frente a unos 5 MB en PNG).
- Hay dos tamaños: miniaturas de 720 px para el mosaico y 1920 px para el visor ampliado.
- Las imágenes de la galería usan `loading="lazy"` y los fondos solo cargan la imagen que toca mostrar.

### 🔊 Audio
- 🎵 `ambient.mp3` se carga solo cuando pulsas el botón de audio (`preload="none"`).
- ⏲️ `tick.mp3` suena cada dos segundos mientras el audio está activo.
- Los navegadores bloquean el sonido automático, por eso el audio empieza apagado y se activa con el botón.

---

## ⚡ Rendimiento y accesibilidad

### ⚡ Rendimiento
- 🚫 **Cero dependencias** de JavaScript. Solo se cargan las fuentes de Google Fonts.
- 🎞️ Las animaciones usan `transform` y `opacity`, que no obligan al navegador a recalcular el diseño.
- 🖌️ Las partículas se dibujan en un solo `<canvas>`, con resolución limitada y pausa automática cuando la pestaña no está visible.
- 📉 En móviles se reduce a la mitad el número de partículas.
- 🧠 Los efectos de parallax con ratón se desactivan en pantallas táctiles.

### ♿ Accesibilidad
- Respeta `prefers-reduced-motion` del sistema y ofrece su propio interruptor.
- Foco visible al navegar con teclado.
- Etiquetas `aria` en el contador, la barra de progreso, el visor y los botones.
- El visor se maneja con teclado: `←` `→` para cambiar y `Esc` para cerrar.

---

## 📱 Diseño responsive

| Dispositivo | Adaptación |
|---|---|
| 🖥️ Monitor grande | Mosaico de 6 columnas y contador de cuatro bloques en una fila. |
| 💻 Portátil | Mismo diseño con tamaños de texto escalados. |
| 📱 Tablet | Menú desplegable y tarjetas que se reorganizan. |
| 📲 Móvil | Contador en cuadrícula de 2×2, galería de 2 columnas y protagonistas apilados. |

---

## 🌍 Publicarlo en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, elige la rama `main` y la carpeta `/ (root)`.
4. Guarda y espera un minuto. Tu página estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`. 🎉

---

## 🛠️ Solución de problemas

| Problema | Solución |
|---|---|
| 🔇 No suena el audio | Pulsa el botón de audio. Los navegadores no permiten reproducir sonido sin que el usuario haga clic. |
| 🔤 Las fuentes se ven distintas | Las fuentes se cargan desde Google Fonts, así que necesitas conexión a internet. |
| 🖼️ Faltan las miniaturas de los tráilers | También vienen de YouTube y requieren conexión. |
| 🎨 Los colores se ven raros | Tu navegador es antiguo y no soporta `color-mix()`. Actualízalo. |
| 🐌 Va lento en mi equipo | Abre **Ajustes** y elige efectos "Suaves" o "Sin efectos", y animaciones "Reducidas". |
| 💾 Quiero borrar mis ajustes | Borra los datos del sitio o ejecuta `localStorage.removeItem('gta6-vicecity-settings')` en la consola. |

---

## 📜 Créditos y aviso legal

- 🛠️ Página creada por **Ishu**, rediseñada con una estética inspirada en Vice City.
- 🎮 *Grand Theft Auto VI* y todos sus nombres, logotipos e imágenes son propiedad de **Rockstar Games, Inc.** y **Take-Two Interactive**.
- ⚠️ Este es un **proyecto de fans, sin ánimo de lucro y no oficial**. No está afiliado ni respaldado por Rockstar Games.
- 📸 Las imágenes deben usarse únicamente si tienes derecho a hacerlo. Si eres titular de los derechos y quieres que se retire algún contenido, no dudes en contactar.
- ℹ️ La información del juego se limita a lo anunciado oficialmente. Cualquier otro dato se considera rumor y no se presenta como confirmado.

---

<p align="center">Hecho con 💖 y mucho neón · <strong>Welcome to Leonida</strong> 🌴</p>
