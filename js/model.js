'use strict';
console.log('model is connected');

class TetrisMap {
    constructor(mapWidth, mapHeight) { // 16 10
        this.score = 0;
        this.isActive = false; // game play status
        this.mapSize = {width: mapWidth, height: mapHeight};
        this.status = this.arrayInit(mapWidth, mapHeight);

        this.block = {
            x_pos: -1,
            y_pos: -1,
            type: -1,
            bricks: Array(4)
        };
    }

    // get num of col/row, then init array for mapping
    arrayInit(height, width) {
        let arr = Array(width);
        // add 1 more row for bottom line
        for(let i = 0; i < width+1; i++) { 
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

// operads - type:rotation operands
const operands = {
        1:[ [ [2,2],[-2,2],[-2,-2],[+2,-2] ], [ [1,1],[-1,1],[-1,-1],[1,-1] ], [ [-1,1],[-1,-1],[1,-1],[1,1] ] ] , // L
        2:[ [ [2,0],[0,2],[-2,0],[0,-2] ], [ [1,1],[-1,1],[-1,-1],[1,-1] ] , [ [-1,1],[-1,-1],[1,-1],[1,1] ]  ] , // Z
        3:[[-1,-1],[-2,-2],[-3,-3]] , // ㅣ
        4:[[1,-1],[1,1],[-1,1],[-1,-1]], // ㅗ
        5:[ [ [1,-1],[1,1],[-1,1],[-1,-1] ], [ [1,1],[-1,1],[-1,-1],[1,-1] ] , [ [0,2],[-2,0],[0,-2],[2,0] ]  ] ,  // S
}
let op_counter = 0;