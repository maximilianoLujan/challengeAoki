import React, { useEffect, useState } from 'react';

export type TileProps = {
  checked: boolean,
  index: number,
  checkTile: ((index:number) => void) | any,
  isValid: boolean,
  clickIndex: number
}

const Tile: React.FC<TileProps> = ({ checked, index, checkTile, isValid, clickIndex }: TileProps) => {
  
  const handleClickTile = () => {
    //Cuando clickean una celda llamo a la funcion checkTile del componente matriz
    checkTile(index); 
  }

  return (
    <div
      onClick={handleClickTile}
      className={`Tile ${checked ? 'checked' : ''} ${isValid?'valid':'not-valid'} ${clickIndex > 0?`index-${clickIndex}`:''}`}>
    </div>
  )
}
export default Tile;