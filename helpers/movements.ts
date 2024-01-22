/**
 *  En el readme se encuentra la documentacion de las funciones con su explicacion
 */
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

function isContiguous(pos: number,nextPos: number): boolean{
    const row: number = Math.floor(pos / 8);
    const col: number = pos % 8;
    const rowNext: number = Math.floor(nextPos / 8);
    const colNext: number = nextPos % 8;
    const posAbs: number = Math.abs(pos - nextPos);

    
    return ((row === rowNext || col === colNext) && (posAbs === 1 || posAbs === 8))
}

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
            const actual = actualTiles[i];
            switch (rest) {
                case -1:
                    newIndex = !rigth?actual + i*9:actual - i*7;
                    if (newIndex < 0 || newIndex > 63){
                        return null
                    }
                    response.push(newIndex);
                    break;
                case 1:
                    newIndex = !rigth?actual - i*9:actual + i*7;
                    if (newIndex < 0 || newIndex > 63){
                        return null
                    }
                    response.push(newIndex);
                    break;
                case 8:
                    newIndex = !rigth?actual - i*7:actual - i*9;
                    if (newIndex < 0 || newIndex > 63){
                        return null
                    }
                    response.push(newIndex);
                    break;
                case -8:
                    newIndex = !rigth?actual + i*7:actual + i*9;
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

export { isValidTile, rotateCounterClock}