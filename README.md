# Simulador de Máquina de Turing en la Web

## Descripción
Este proyecto es un simulador web interactivo de una Máquina de Turing. Permite visualizar el funcionamiento de una Máquina de Turing clásica, mostrando la cinta, el cabezal de lectura/escritura, y las transiciones de estado.

## Estructura del Proyecto

```
/ (raíz del proyecto)
|
+-- index.html    (La estructura de la máquina)
+-- style.css     (La apariencia de la máquina)
+-- script.js     (El "motor" y la "tabla de reglas")
+-- README.md     (La documentación del proyecto)
+-- .gitignore    (Configuración de archivos ignorados)
```

## Características

- **Visualización de la cinta**: Muestra las celdas de la cinta con el símbolo actual
- **Cabezal de lectura/escritura**: Indica la posición actual del cabezal
- **Controles interactivos**: 
  - Iniciar: Ejecuta la máquina automáticamente
  - Paso a Paso: Ejecuta una transición a la vez
  - Reiniciar: Vuelve al estado inicial
  - Detener: Pausa la ejecución automática
- **Tabla de transiciones**: Muestra las reglas de la máquina
- **Estado de la máquina**: Muestra el estado actual, posición del cabezal y estado de ejecución

## Cómo Usar

1. Abre el archivo `index.html` en un navegador web
2. Ingresa una cadena de entrada en el campo "Cadena de entrada"
3. Presiona Enter o haz clic en "Reiniciar" para cargar la cadena
4. Usa los botones de control para ejecutar la máquina:
   - **Iniciar**: Ejecuta automáticamente con pausas de 0.5 segundos entre pasos
   - **Paso a Paso**: Ejecuta un paso a la vez para observar cada transición
   - **Detener**: Pausa la ejecución automática
   - **Reiniciar**: Vuelve a cargar la entrada y resetea el estado

## Ejemplo Incluido

El simulador viene con un ejemplo precargado que invierte bits:
- Entrada: `0011`
- Salida esperada: `1100`
- La máquina lee cada bit y lo invierte (0 → 1, 1 → 0)

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla - sin frameworks)

## Personalización

Puedes modificar las reglas de transición editando la función `loadExampleRules()` en `script.js`. Cada regla tiene el formato:

```javascript
tm.addTransition(estadoActual, símboloLeído, nuevoEstado, símboloEscrito, dirección);
```

Donde:
- **estadoActual**: Estado actual de la máquina
- **símboloLeído**: Símbolo que se lee de la cinta
- **nuevoEstado**: Estado al que transiciona
- **símboloEscrito**: Símbolo que se escribe en la cinta
- **dirección**: 'R' (derecha), 'L' (izquierda), o 'S' (sin movimiento)

## Autor

Samuel Zuleta

## Licencia

Este proyecto es de código abierto y está disponible para uso educativo.