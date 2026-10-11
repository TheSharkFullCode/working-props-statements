# 👑 Reyes Godos — Practicando `useState` y eventos en React
 
Proyecto de aprendizaje hecho con **React + Vite**. Muestra tarjetas de reyes visigodos (Atanagildo, Sisebuto y Leovigildo) que reaccionan a los clics del usuario.
 
El objetivo es practicar:
 
- `useState` (crear y cambiar estados)
- Funciones manejadoras de eventos (`onClick`)
- Cambiar atributos dinámicamente (`src` y `style`)
- Condicionales `if / else` dentro de funciones
- La **propagación de eventos** (burbujeo) y `stopPropagation()`
- La diferencia entre `visibility` y `display` en CSS
---
 
## 🎯 Qué hace la aplicación
 
Cada tarjeta tiene una **imagen**, un **nombre** y una **caja** que los contiene.
 
| Acción | Resultado |
|---|---|
| 1er clic en la caja / imagen | La imagen cambia a **incógnito** |
| 2º clic | La imagen **desaparece** |
| 3er clic | La **caja entera** desaparece |
| Clic en el nombre | El nombre desaparece (no cuenta para la caja) |
 
---
 
## 🧱 Estructura
 
```
src/
├── App.jsx                       → Pinta las 3 tarjetas
├── App.css
└── components/
    └── MyFirstComponent.jsx      → La tarjeta de cada rey
```
 
En `App.jsx` se reutiliza el mismo componente tres veces, pasándole **props** distintas:
 
```jsx
<MyFirstComponent imagen={Atanagildo} nombre="Atanagildo" ImagenAlternativa={incognito} />
<MyFirstComponent imagen={Sisebuto}   nombre="Sisebuto"   ImagenAlternativa={incognito} />
<MyFirstComponent imagen={Leogivildo} nombre="Leovigildo" ImagenAlternativa={incognito} />
```
 
---
 
## 📚 Conceptos aprendidos
 
### 1. `useState`: crear y cambiar un estado
 
```jsx
const [actual, setActual] = useState(imagen)
//     ↑          ↑                    ↑
//   el valor   la función         el valor con
//   guardado   para cambiarlo     el que empieza
```
 
- `useState` **crea** el estado (una sola vez, arriba del componente).
- `setActual(...)` **reemplaza** el valor por lo que pongas dentro.
- Cada vez que cambias un estado, React **vuelve a pintar** el componente y todo lo que use ese estado se actualiza solo.
### 2. Cada estado tiene un trabajo
 
| Estado | Para qué sirve | Dónde se usa |
|---|---|---|
| `actual` | Qué foto se enseña | `src` |
| `verImagen` | Si la imagen se ve o no | `style` |
| `verNombre` | Si el nombre se ve o no | `style` |
| `clicks` | Cuántos clics lleva la caja | dentro de la función |
| `verCaja` | Si la caja se ve o no | `style` |
 
### 3. Usar un estado como "memoria" con `if / else`
 
```jsx
const ChangeActual = () => {
  if (actual === imagen) {
    setActual(ImagenAlternativa)   // ¿todavía enseño al rey? → pongo incógnito
  } else {
    setVerImagen("hidden")         // ya estoy en incógnito → la escondo
  }
}
```
 
`actual === imagen` solo sirve para **preguntar** si es el primer o el segundo clic. La respuesta decide qué estado se cambia.
 
### 4. ⚠️ Trampa 1: el clic "sube" (propagación)
 
Si un elemento está **dentro** de otro, un clic en el hijo también llega al padre:
 
```
clic en <img>  →  se ejecuta ChangeActual
               →  y TAMBIÉN sube al <div> y se ejecuta ClickCaja
```
 
> Los **estados** van por separado, pero los **clics** no.
 
Para que un clic se quede donde está y no suba:
 
```jsx
const OcultarTexto = (e) => {
  e.stopPropagation()   // el clic NO sube a la caja
  setVerNombre("hidden")
}
```
 
`e` es el evento del clic. React lo pasa automáticamente a la función.
 
### 5. ⚠️ Trampa 2: `visibility` vs `display`
 
Con `visibility: hidden` en el padre, un hijo con `visibility: visible` **se sigue viendo**. Por eso el nombre se quedaba flotando cuando la caja desaparecía.
 
| Propiedad | Qué hace |
|---|---|
| `visibility: "hidden"` | Lo esconde, pero sigue ocupando su sitio. Los hijos pueden seguir viéndose. |
| `display: "none"` | Lo borra de la pantalla **con todo lo que tiene dentro**. |
 
Por eso la caja usa `display`:
 
```jsx
const [verCaja, setVerCaja] = useState("block")
// ...
setVerCaja("none")
// ...
<div style={{ display: verCaja }}>
```
 
---
 
## 🧩 Versión 1: una función por elemento
 
La imagen tiene su propia función. Su clic **sí sube** a la caja (sin `stopPropagation`), así los clics de la imagen cuentan para el contador. El nombre no cuenta.
 
```jsx
import React, { useState } from 'react'
 
export default function MyFirstComponent({ imagen, nombre, ImagenAlternativa }) {
  const [actual, setActual] = useState(imagen)
  const [verImagen, setVerImagen] = useState("visible")
  const [verNombre, setVerNombre] = useState("visible")
  const [clicks, setClicks] = useState(0)
  const [verCaja, setVerCaja] = useState("block")
 
  const ChangeActual = () => {
    if (actual === imagen) {
      setActual(ImagenAlternativa)
    } else {
      setVerImagen("hidden")
    }
  }
 
  const OcultarTexto = (e) => {
    e.stopPropagation()
    setVerNombre("hidden")
  }
 
  const ClickCaja = () => {
    setClicks(clicks + 1)
    if (clicks + 1 === 3) {
      setVerCaja("none")
    }
  }
 
  return (
    <div className="caja-reyes-godos" onClick={ClickCaja} style={{ display: verCaja }}>
      <img src={actual} onClick={ChangeActual} style={{ visibility: verImagen }} alt={nombre} />
      <p onClick={OcultarTexto} style={{ visibility: verNombre }}>{nombre}</p>
    </div>
  )
}
```
 
> 💡 Si añades `e.stopPropagation()` también en `ChangeActual`, la caja ya no cuenta los clics de la imagen y necesitarás 3 clics más en la zona amarilla para hacerla desaparecer.
 
---
 
## 🧩 Versión 2: un solo contador que manda en todo (la más sencilla)
 
Una sola función hace todos los pasos. Es como una lista de instrucciones numeradas.
 
```jsx
import React, { useState } from 'react'
 
export default function MyFirstComponent({ imagen, nombre, ImagenAlternativa }) {
  const [clicks, setClicks] = useState(0)
  const [actual, setActual] = useState(imagen)
  const [verImagen, setVerImagen] = useState("visible")
  const [verNombre, setVerNombre] = useState("visible")
  const [verCaja, setVerCaja] = useState("block")
 
  const ClickCaja = () => {
    const nuevo = clicks + 1
    setClicks(nuevo)
 
    if (nuevo === 1) setActual(ImagenAlternativa)  // paso 1: incógnito
    if (nuevo === 2) setVerImagen("hidden")        // paso 2: escondo la imagen
    if (nuevo === 3) setVerCaja("none")            // paso 3: adiós caja
  }
 
  const OcultarTexto = (e) => {
    e.stopPropagation()
    setVerNombre("hidden")
  }
 
  return (
    <div className="caja-reyes-godos" onClick={ClickCaja} style={{ display: verCaja }}>
      <img src={actual} style={{ visibility: verImagen }} alt={nombre} />
      <p onClick={OcultarTexto} style={{ visibility: verNombre }}>{nombre}</p>
    </div>
  )
}
```
 
- La imagen ya **no tiene `onClick`**: su clic sube a la caja y la caja hace todo.
- Diferencia con la versión 1: cualquier clic dentro de la caja avanza un paso, aunque sea en la zona amarilla.
- ¿Quieres un paso 4? Añade otro `if`.
---
 
## 🚀 Cómo ejecutarlo
 
```bash
npm install
npm run dev
```
 
Abre en el navegador la dirección que aparece en la terminal (normalmente `http://localhost:5173`).
 
---
 
## 📤 Subir el proyecto a GitHub
 
### Antes de empezar
 
1. Crea un repositorio **vacío** en GitHub (sin README, sin .gitignore). Por ejemplo: `reyes-godos`.
2. Comprueba que tienes un archivo `.gitignore` en la raíz con, al menos:
```
   node_modules
   dist
```
   (Vite lo crea solo, pero revísalo.)
 
### Primera vez
 
Abre la terminal **dentro de la carpeta del proyecto** y ejecuta:
 
```bash
git init                                  # inicia git en la carpeta
git add .                                 # prepara todos los archivos
git commit -m "Reyes godos: useState, onClick y stopPropagation"
git branch -M main                        # llama "main" a la rama principal
git remote add origin https://github.com/TheSharkFullCode/reyes-godos.git
git push -u origin main                   # sube el proyecto
```
 
> Cambia `reyes-godos` por el nombre real de tu repositorio.
 
### Las siguientes veces (cuando hagas cambios)
 
```bash
git add .
git commit -m "Describe aquí lo que cambiaste"
git push
```
 
### Comandos útiles
 
```bash
git status        # ver qué archivos han cambiado
git log --oneline # ver el historial de commits
git remote -v     # ver a qué repositorio está conectado
```
 
### Si da error en `git remote add`
 
Significa que ya había un remoto conectado. Cámbialo así:
 
```bash
git remote set-url origin https://github.com/TheSharkFullCode/reyes-godos.git
```
 
---
 
## ✍️ Autor
 
**Oscar** — [@TheSharkFullCode](https://github.com/TheSharkFullCode)
Aprendiendo React paso a paso 💪
