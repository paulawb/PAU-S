# Métodos Numéricos - Proyecto Simple

Este proyecto implementa los métodos de Bisección, Newton-Raphson y Secante usando solo HTML y TypeScript, sin frameworks ni herramientas externas.

## Estructura
- `index.html`: Interfaz principal, con formularios y tablas para cada método.
- `main.ts`: Conecta la interfaz con la lógica de los métodos.
- `modelos/`: Contiene la lógica de cada método numérico.
- `controladores/`: Conecta los modelos con la interfaz.

## Uso
1. Abre `index.html` en tu navegador.
2. Selecciona el método, ingresa los datos y presiona "Calcular".
3. Los resultados aparecerán en una tabla.

## Explicación
- El código está comentado y es fácil de seguir.
- No requiere instalación de dependencias ni compiladores externos.
- Ideal para aprender y explicar los métodos numéricos de forma sencilla.

## Nota
Si usas TypeScript, compila los archivos `.ts` a `.js` usando el comando:
```
tsc main.ts modelos/*.ts controladores/*.ts --target ES6 --outDir .
```
Luego asegúrate que `index.html` cargue `main.js`.
