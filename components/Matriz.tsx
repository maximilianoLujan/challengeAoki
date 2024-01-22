import React, { useEffect, useState } from 'react';
import Tile, { TileProps } from './Tile';
import { isValidTile } from "../helpers/movements";
import { rotateCounterClock } from '../helpers/movements';
import { FaArrowRotateLeft, FaArrowRotateRight,FaTrash } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type MatrizProps = {
  tiles: TileProps[],
}


const Matriz: React.FC<MatrizProps> = ({ tiles }: MatrizProps) => {
  const [initialTiles, setInitialTiles] = useState(tiles);
  const [solution,setSolution] = useState<number[]>([])

  const checkTile = (index: number): void => {
    if(solution.length === 4){
      toast.error('La linea ya esta completa', { position: 'top-center', autoClose: 1000 })
      return;
    }
    //Llamo a isValid para verificar que la posicion que quieren agregar no viola ninguna restriccion
    const isValid = isValidTile(solution,index);
    if(!isValid){
      toast.error('La casilla no es valida', { position: 'top-center', autoClose: 1000 })
    } else {
      const newValues = [...solution];
      newValues.push(index);
      setSolution(newValues);
    }
  }

  const handleClickDeleteMovement = () => {
    //Cuando eliminan un elemento, actualizo tanto la solucion como la matriz
    if(solution.length === 0){
      toast.error('La casilla no es valida', { position: 'top-center', autoClose: 1000 })
    } else {
      const newValues = [...solution];
      newValues.pop();
      setSolution(newValues);
    }
  }

  //Girar la linea contra-reloj
  const handleClickRotateClockWise = () => {
    const rotate = rotateCounterClock(solution,false)
    if(rotate === null){
      toast.error('La casilla no es valida', { position: 'top-center', autoClose: 1000 })
    } else {
      setSolution(rotate)
    }
  }

  //Girar la linea como las agujas del reloj
  const handleClickRotateClock = () => {
    const rotate = rotateCounterClock(solution,true)
    if(rotate === null){
      toast.error('La casilla no es valida', { position: 'top-center', autoClose: 1000 })
    } else {
      setSolution(rotate)
    }
  }

  //Elimina todos los elementos de la solucion
  const handleClickDeleteAllMovements = () => {
    const newSolution = [];
    setSolution(newSolution)
  }

  useEffect(() => {
    //Cada vez que cambia el arreglo solucion, devo actualizar el estado de la matriz para colorear los elementos que tienen checked = true
    if (solution.length === 4) {
      toast.success('Felicidades, completaste la linea!!!',{ position: 'top-center', autoClose: 1500, theme: 'colored' })
    }
    setInitialTiles(initialTiles.map((elem,index) => {
      if([...solution].includes(elem.index)){
        return {checked: true,index,checkTile,isValid: isValidTile(solution,index),clickIndex: solution.indexOf(index)}
      } else {
        return {checked: false,index,checkTile,isValid: isValidTile(solution,index),clickIndex: 0}
      }
    }))
  }, [solution])

  return (
    <div className='container-matrix'>
      <ToastContainer/>
      <div className="Matriz">
        {initialTiles.map((tile, i) => (
          <Tile key={i} index={i} checked={tile.checked} checkTile={checkTile} isValid={isValidTile(solution,i) && solution.length < 4} clickIndex={tile.clickIndex}/>
        ))}
      </div>
      <div className='cont-buttons'>
          <button 
            disabled={rotateCounterClock(solution,false) === null}
            onClick={handleClickRotateClockWise}
            className='button rotate-left'>
            <FaArrowRotateLeft/>
          </button>
          <button 
            disabled={rotateCounterClock(solution,true) === null}
            onClick={handleClickRotateClock}
            className='button rotate-right'>
            <FaArrowRotateRight/>
          </button>
          <button 
            disabled={solution.length === 0?true:false}
            onClick={handleClickDeleteMovement}
            className='button deleteOne'>
            <FaTrash/>
          </button>
          <button 
            disabled={solution.length === 0?true:false}
            onClick={handleClickDeleteAllMovements}
            className='button delete'>
            <ImCross/>
          </button>
      </div>
    </div>
  )
}
export default Matriz;
