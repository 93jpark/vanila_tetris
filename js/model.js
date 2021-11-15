'use strict';
console.log('model is connected');

class TetrisMap {
    constructor(mapWidth, mapHeight) { // 16 10
        this.isActive = false;
        this.mapSize = {width: mapWidth, height: mapHeight};
        this.status = this.arrayInit(mapWidth, mapHeight);
        this.block = {
            status: true,
            x_pos: -1,
            y_pos: -1,
            type: -1,
            bricks: Array(4)
        };
        this.score = 0;
        
        // status[x][y]
        //console.log(this.status);
    }

    // get num of col/row, then init array for mapping
    arrayInit(height, width) {
        let arr = Array(width);
        for(let i = 0; i <= width; i++) {
            arr[i] = Array(height);
            arr[i].fill(0);
        }
        // bottom line init
        arr[16].fill(2);
        return arr;
    }

    // return bricks array after deep copy
    getBricks() {
        let newBricks = Array(4);
        for(let i = 0; i < 4; i++) {
            newBricks[i] = this.block.bricks[i].slice();
        }
        return newBricks;
    }
} 



