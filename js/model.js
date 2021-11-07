'use strict';
console.log('model is connected');


class TetrisMap {
    constructor(mapWidth, mapHeight) {
        this.mapSize = {row: null, col: null};
        this.status = this.arrayInit(mapWidth, mapHeight);
        
        
        // status[x][y]
        console.log(this.status);
    }

    // get num of col/row, then init array for mapping
    arrayInit(height, width) {
        let arr = Array(height);
        for(let i = 0; i < height; i++) {
            arr[i] = Array(width);
            arr[i].fill(0);
        }
        return arr;
    }

} 

let tm = new TetrisMap(16, 10);
tm.status[1][1] = 1;
tm.status[7][7] = 1;

