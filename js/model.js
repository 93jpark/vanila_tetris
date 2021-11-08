'use strict';
console.log('model is connected');


class TetrisMap {
    constructor(mapWidth, mapHeight) { // 16 10
        this.mapSize = {width: mapWidth, height: mapHeight};
        this.status = this.arrayInit(mapWidth, mapHeight);
        this.brick = {
            status: true,
            x_pos: 3,
            y_pos: 3
        };
        
        // status[x][y]
        console.log(this.status);
    }

    // get num of col/row, then init array for mapping
    arrayInit(height, width) {
        let arr = Array(width);
        for(let i = 0; i < width; i++) {
            arr[i] = Array(height);
            arr[i].fill(0);
        }
        return arr;
    }

} 

let tm = new TetrisMap(10, 16);
tm.status[1][1] = 1;
tm.status[7][7] = 1;

