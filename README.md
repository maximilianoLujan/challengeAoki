#### [Epecificaciones Técnicas abajo del readme](#especificaciones-técnicas) ↓
# Batalla naval borracha
![Logo de Matriz](https://camo.githubusercontent.com/944dc826f9d5e1e3359b88357eb0aaac60c0ee59638fe7f0b1ab92db0aee0e35/68747470733a2f2f692e696d6775722e636f6d2f66496b6d3867582e706e67)
## Descripción

Bienvenido a Batalla naval borracha, un emocionante juego de estrategia donde tu objetivo es formar una línea de 4 casilleros en una matriz de 8x8. ¡Desafía tu mente!

## Instrucciones

### 1. Cómo Jugar

- Al hacer clic en un casillero, se mostrarán los posibles movimientos disponibles.
- El jugador debe formar una línea de 4 casilleros para ganar.

### 2. Funcionalidades Adicionales

- **Eliminar Todos los Movimientos:** Si necesitas empezar de nuevo, puedes eliminar todos los movimientos realizados.
- **Eliminar Último Movimiento:** ¿Te arrepentiste de tu último movimiento? No hay problema, simplemente elimínalo.
- **Rotar la Línea a la Derecha e Izquierda:** Añade un toque estratégico a tu juego rotando la línea en ambas direcciones.

## Version de node
   v14.16.1

Si tienes una version mas reciente, utiliza un controlador de versiones de node (como nvm) para cambiar entre versiones
-nvm: https://github.com/nvm-sh/nvm

## Instalación 

1. **Clona el Repositorio:**
   ```bash
   git clone https://github.com/maximilianoLujan/challenge-aoki
2. **Entra al Directorio del Proyecto:**
   ```bash
   cd challenge-aoki
3. **Instala las dependencias:**
   ```bash
   npm install
4. **Ejecuta el programa:**
   ```bash
   npm run dev
5. Dirigete a  http://localhost:3000 o 

6. **Para correr los StoryBooks:**
   ```bash
   npm run storybook
7. **Encontraras los storybooks en:**
  * http://localhost:6006/?path=/story/matriz--matrix-8-8
  * http://localhost:6006/?path=/story/matriz--matrix-8-16
  * http://localhost:6006/?path=/story/matriz--matrix-4-4



## Dependencias agregadas 
- React-toastify https://fkhadra.github.io/react-toastify/introduction/
- Se actualizo react-icons https://react-icons.github.io/react-icons/

## especificaciones-técnicas
#### Para controlar los movimientos en la matriz y la rotacion de las lineas hay 3 funciones fundamentales

1. isContiguous
   ```typescript
   function isContiguous(pos: number,nextPos: number): boolean{
    const row: number = Math.floor(pos / 8);
    const col: number = pos % 8;
    const rowNext: number = Math.floor(nextPos / 8);
    const colNext: number = nextPos % 8;
    const posAbs: number = Math.abs(pos - nextPos);

    
    return ((row === rowNext || col === colNext) && (posAbs === 1 || posAbs === 8))
   }
- Parámetros: Última posición con check y posición a agregar
- Retorno: Boolean indicando si las posiciones están pegadas y si pertenecen a la misma fila o columna
- Funcionalidad: Para que dos posiciones sean contiguas, el valor absoluto de la resta de las posiciones debe ser 1(están al lado, de forma horizontal) u 8(de forma vertical) y ademas deben pertenecer a la misma fila o columna. Si dividimos la posición por 8 y tomamos el piso, obtenemos la fila en la que se encuentra esa posición, mientras que para obtener la columna debemos quedarnos con el resto de la división.

2. isValidTile
   ```typescript
   function isValidTile(actualTiles: Array<number>,index: number): boolean {
     const length = actualTiles.length;
     if(length === 0){
       return true;
     } else if (length === 1){
       const pos: number = actualTiles[0];
       return isContiguous(pos,index); 
     } else {
       const rest: number = actualTiles[length - 1] - actualTiles[length - 2];
       return ((rest === index - actualTiles[length - 1]) && isContiguous(actualTiles[actualTiles.length - 1],index));
     }
   }
- Parámetros: Arreglo de las celdas ya marcadas y posición que se clickeo
- Retorno: Boolean indicando si es correcto el movimiento que quiere realizar, teniendo en cuenta su solución actual
- Funcionalidad:
  - **Caso 1 (length === 0):** Si no hay casillas seleccionadas, la función retorna `true` ya que cualquier posición es válida.
  - **Caso 2 (length === 1):** Si solo hay una casilla seleccionada, la función verifica si la nueva posición (`index`) es contigua con la única casilla existente. En este caso nos va a retornar true en 2, 3 o 4 casillas dependiendo de si la primera marcada se encuentra en una esquina, en algún borde o en el medio de la matriz.
  - **Caso 3 (length > 1):** Cuando hay más de una casilla seleccionada, significa que el usuario ya tomo la decisión de en que dirección ir, por lo tanto solo devolverá `true` un casillero
  Para esto se verificó:
     1. La diferencia entre las dos últimas casillas es igual a la distancia entre la última casilla y la nueva posición (`index`).
     2. La nueva posición (`index`) es contigua con la última casilla seleccionada.
   
   Si ambas condiciones se cumplen, la función retorna `true`; de lo contrario, retorna `false`.

3. rotateCounterClock
   ```typescript
   function rotateCounterClock(actualTiles: Array<number>,rigth: boolean): Array<number> | null{
     const length = actualTiles.length;
     if(length < 4){
       return null
     } else {
       const rest = actualTiles[length - 1] - actualTiles[length - 2],
         response: Array<number> = [];
       response.push(actualTiles[0]);
       for(let i = 1;i < length;i++){
         let newIndex: number;
         switch (rest) {
           case -1:
             newIndex = !rigth?actualTiles[i] + i*9:actualTiles[i] - i*7;
             if (newIndex < 0 || newIndex > 63){
               return null
             }
             response.push(newIndex);
             break;
           case 1:
             newIndex = !rigth?actualTiles[i] - i*9:actualTiles[i] + i*7;
             if (newIndex < 0 || newIndex > 63){
               return null
             }
             response.push(newIndex);
             break;
           case 8:
             newIndex = !rigth?actualTiles[i] - i*7:actualTiles[i] - i*9;
             if (newIndex < 0 || newIndex > 63){
               return null
             }
             response.push(newIndex);
             break;
           case -8:
             newIndex = !rigth?actualTiles[i] + i*7:actualTiles[i] + i*9;
             if (newIndex < 0 || newIndex > 63){
               return null
             }
             response.push(newIndex);
           default:   
         }
       }
       for(let i = 1;i < response.length;i++){
         if(!isContiguous(response[i - 1],response[i])){
           return null;
       }
     }
    return response
    }
   }
- Parámetros: Arreglo de enteros con la solucion actual del usuario y boolean para indicar si el sentido de la rotacion es horaria o antihoraria (si es `true`, la rotacion es horaria. Si es `false`, la rotacion es antihoraria).
- Retorno: Si la rotacion puede ser efectuada, la funcion retorna el arreglo correspondiente a la rotacion. Mientras que si la rotacion no se puede realizar, la funcion retorna null.
- Funcionalidad:
   - Primero, si la longitud de la solucion es < 4, la linea no se puede rotar.
   - Si la longitud de la línea es 4, calculamos la dirección de la línea(esto es lo que se almacena el la variable `rest` que nos va a indicar para que lado hay que girar y va a entrar en algun caso del switch case)
        - case -1: Significa que la línea esta de derecha a izquierda, por lo que al índice de la lnea original hay que sumarle i * 7(antihorario) o restarle i*7(horario).
        - case 1: Significa que la línea esta de izquierda a derecha, por lo que al índice de la línea original hay que restarle i * 9(antihorario) o sumarle i*7(horario).
        - case 8: Significa que la línea esta de arriba hacia abajo, por lo que al índice de la línea original hay que restarle i * 7(antihorario) o restarle i*9(horario).
        - case -8: Significa que la línea esta de abajo hacia arriba, por lo que al índice de la línea original hay que sumarle i * 7(antihorario) o sumarle i*9(horario).
   -Por último, si fue posible crear la solución, recorro la misma para comprobar que no se haya creado con posiciones que no son continuas.

#### Utilización de REACT
   
   - Para la matriz se representaron dos estados: 
      - Uno para llevar registro de toda la matriz y mapearla en la UI del usuario
      - Otro para llevar registro de la solución del usuario
      - Cuando el usuario hace click en cualquier celda válida, se actualizan los dos estados, el de la solución para agregar la nueva celda y el de la matriz para actualizar las celdas que estan marcadas.
   - Cada Tile cuenta con 4 propiedades:
      - key: Para que react lo identifique de forma unívoca
      - checked: Indica si la celda esta clickeada. En caso de estarlo se pinta de verde.
      - checkTile: Función de la matriz para actualizar la celda que se haga click.
      - isValid: Indica si la celda es válida para ser clickeada.

