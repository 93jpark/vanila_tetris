'use strict';
console.log('model is connected');


class TetrisMap {
    constructor(mapWidth, mapHeight) {
        this.mapSize = {row: null, col: null};
        this.status = Array(16);
        for(let i = 0; i < this.status.length; i++) {
            this.status[i] = Array(10);
            this.status[i].fill(0);
        }
        // status[x][y]
        console.log(this.status);
    }
}

let tm = new TetrisMap(10, 16);
tm.status[1][1] = 1;
tm.status[7][7] = 1;

