'use strict';
console.log(`main.js is connected`);


/* GLOBAL VARIABLE for canvas */
const CANVAS = document.querySelector('#playground');
const BRICK_SIZE = 50;

let temp_count = 0;

document.addEventListener('keydown', logKey);
window.addEventListener('keydown', disableScroll);
document.querySelector('#res_status').innerHTML = `${CANVAS.offsetWidth} * ${CANVAS.offsetHeight}`;

function disableScroll(e) {
    switch(e.code) {
        case "ArrowUp": case "ArrowDown": 
        case "ArrowLeft": case "ArrowRight" : case "Space": 
        e.preventDefault(); // prevent scoll viewpoint of browser.
        break;

        default: break; // pass other keys
    }
}

function logKey(e) {
    // console.log(`${e.code} is pressed`);
    // console.log(`${e.keyCode} is pressed`);
    document.querySelector('#keydown_status').innerHTML = `${e.code}`;
    temp_count++;
    if(temp_count > 10) {
        temp_count = 0;
        console.clear();
    }
}

if (CANVAS.hasFocus) {
    document.querySelector('#focus_status').innerHTML = `out`;
} else {
    document.querySelector('#focus_status').innerHTML = `in`;
}


class TetrisMap {
    constructor(mapWidth, mapHeight) {
        this.mapSize = {row: null, col: null};
        this.ctx = null; /* cts is for canvas */
        this.isGamePlaying = false;
        //this.movingBrick = {currX: null, currY: null};
        this.movingBrick = null;
        this._moveBrick = this._moveBrick.bind(this);
        this._controller = this._controller.bind(this);
    }

    _initialize() {
        this.ctx = CANVAS.getContext('2d');
        // set up canvas outline
        this.ctx.stroke();
        this.ctx.lineWidth = 0.1;
        
    }

    _drawMapOutline() {
        let row = CANVAS.height / BRICK_SIZE;
        let col = CANVAS.width / BRICK_SIZE;
        console.log(`Tetris playground size: ${col} x ${row}`)
        this.mapSize.row = row;
        this.mapSize.col = col;
        let mapArr = 0;

        for(let r = 0; r <= row; r++) {
            for(let c = 0; c <= col; c++) {
                this.ctx.strokeRect(c*BRICK_SIZE, r*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
            }
        }
    }

    _createBrick(posX, posY) {
        //this.movingBrick = { currX:posX, currY:posY };
        this.movingBrick = new Brick();
        console.log(this.movingBrick);
        this.ctx.fillRect(this.movingBrick.currX*BRICK_SIZE, this.movingBrick.currY*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
    }

    _controller(e) {
        let direction = e.keyCode;

        const prevPosX = this.movingBrick.currX;
        const prevPosY = this.movingBrick.currY;
        let newPosX = prevPosX;
        let newPosY = prevPosY;

        switch(direction) {
            case 37: // left
                newPosX -= 1;
                break;
            case 38: // up
                console.log('up keydown');
                break;
            case 39: // right
                newPosX += 1;
                break;
            case 40: // down
                newPosY += 1;
        }

        if (this._detectCollision(newPosX, newPosY)) {
            console.log('collision detected');
        } else {
            console.log('pass');
            this._moveBrick(newPosX, newPosY);
        }

    }

    _detectCollision(newPosX, newPosY) {
        if (newPosX >= this.mapSize.col || 
            newPosY >= this.mapSize.row ||
            newPosX < 0 || 
            newPosY < 0) {
                return true;
            }

            return false;
    }


    _moveBrick(newPosX, newPosY) {
        const prevPosX = this.movingBrick.currX;
        const prevPosY = this.movingBrick.currY;

        this.ctx.clearRect(prevPosX*BRICK_SIZE, prevPosY*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
            this._drawMapOutline();
            this.ctx.fillRect(newPosX*BRICK_SIZE, newPosY*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
            this.movingBrick.currX = newPosX;
            this.movingBrick.currY = newPosY;
            console.log(newPosX, newPosY);
            console.log(this.movingBrick.currX, this.movingBrick.currY);
    }

    // _moveBrick(e) {
    //     let direction = e.keyCode;
    //     // up: 38 down: 40 left: 37 right: 39
    //     console.log("direction: ", direction);
    //     if (direction == 38) {
    //         console.log("TRUE");
    //     }

    //     console.log('movingBrick',this.movingBrick);
        
    //     const prevPosX = this.movingBrick.currX;
    //     const prevPosY = this.movingBrick.currY;
    //     let newPosX = prevPosX;
    //     let newPosY = prevPosY;


    //     console.log(newPosX, newPosY);
    //     switch(direction) {
    //         case 37: // left
    //             newPosX -= 1;
    //             break;
    //         case 38: // up
    //             console.log('up keydown');
    //             break;
    //         case 39: // right
    //             newPosX += 1;
    //             break;
    //         case 40: // down
    //             newPosY += 1;
    //     }

    //     console.log(newPosX, newPosY);
        
    //     console.log('check point! ', this.mapSize);
    //     if (newPosX >= this.mapSize.col || 
    //         newPosY >= this.mapSize.row ||
    //         newPosX < 0 || 
    //         newPosY < 0) {
    //         '';
    //     } else {
    //         this.ctx.clearRect(prevPosX*BRICK_SIZE, prevPosY*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
    //         this._drawMapOutline();
    //         this.ctx.fillRect(newPosX*BRICK_SIZE, newPosY*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
    //         this.movingBrick.currX = newPosX;
    //         this.movingBrick.currY = newPosY;
    
    //     }
    // }


}


let tm = new TetrisMap(500, 350);
tm._initialize(); // setup canvas
tm._drawMapOutline(); // draw grid map
tm._createBrick(0, 0); 
window.addEventListener("keydown", tm._controller, false);

let temp = new Array(10);
for (i in temp) {
    console.log(i);
}
