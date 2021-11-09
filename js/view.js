'use strict';
console.log('view is connected');



function initializeDisplay() {
    ctx = CANVAS.getContext('2d');
    // set up canvas outline
    ctx.stroke();
    ctx.lineWidth = 0.1;
    ctx.clearRect(0,0,CANVAS.width, CANVAS.height);
    ctx.beginPath();
    drawMapOutline();
}

function drawMapOutline() {
    let row = CANVAS.height / BRICK_SIZE;
    let col = CANVAS.width / BRICK_SIZE;
    console.log(`Tetris playground size: ${col} x ${row}`)

    for(let r = 0; r <= row; r++) {
        for(let c = 0; c <= col; c++) {
            ctx.strokeRect(c*BRICK_SIZE, r*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
        }
    }
}

function fillCoordinatePoint(x_pos, y_pos){
    ctx.fillStyle = "#F5AC4E";
    //y_pos -= tm.mapSize.height-1;
    ctx.fillRect(x_pos*BRICK_SIZE, y_pos*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
    console.log(`filled x:${x_pos}, y:${y_pos}`);
}

function updateMap() {
    let count = 0;

    fillCoordinatePoint(tm.brick.x_pos, tm.brick.y_pos);

    // fill map based on map status
    for(let r = 0; r < tm.mapSize.height; r++) {
        for(let c = 0; c < tm.mapSize.width; c++) {
            if(tm.status[r][c] > 0) {
                ctx.fillStyle = "#DD4224";
                ctx.strokeRect(c*BRICK_SIZE, r*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
                count += 1;
            }            
        }
    }
    console.log(count);

}