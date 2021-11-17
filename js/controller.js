'use strict';
console.log('controller is connected');

document.addEventListener('keydown', logKey);
window.addEventListener('keydown', disableScroll);
document.addEventListener('keydown', detectKeyStroke);
//document.querySelector('#res_status').innerHTML = `${CANVAS.offsetWidth} * ${CANVAS.offsetHeight}`;

let temp_count = 0;

// auto drop controller
//let autoDrop = setInterval(()=>moveBlock(0, 1), 900);


// disable scrolling from arrow key manipulation
function disableScroll(e) {
    switch(e.code) {
        case "ArrowUp": case "ArrowDown": 
        case "ArrowLeft": case "ArrowRight" : case "Space": 
        e.preventDefault(); // prevent scoll viewpoint of browser.
        break;

        default: break; // pass other keys
    }
}
// r 82
// d 68

// detect arrow key stroke, and make move with direction
function detectKeyStroke(e) {
    // up 38, left 37, right 39, down 40
    console.log(e.keyCode);
    switch(e.keyCode) {
        case 37: // left
            moveBlock(-1, 0);
            console.log("left"); break;
        case 38: // up
            //moveBlock(0, -1);
            rotateBlock()
            console.log("up"); break;
       case 39: // right
            moveBlock(1, 0);
            console.log("right"); break;
        case 40: // down
            moveBlock(0, 1);
            tm.score += 1;
        default:
            //console.log('invalid key input');
        
    }
}

function rotateBlock() {
    const type = tm.block.type;
    let current = tm.getBricks();
    let op = [];

    switch(type) {
        case 0: // ㅁ
            console.log("type 0");
            break;
        case 1: // L
            console.log("type 1");
            for(let i = 0; i < 3; i++) {
                tm.block.bricks[i+1][0] += operands[type][i][op_counter%4][0] // x
                tm.block.bricks[i+1][1] += operands[type][i][op_counter%4][1] // y    
            }
            break;
        case 2: // z
            console.log("type 2");
            for(let i = 0; i < 3; i++) {
                tm.block.bricks[i+1][0] += operands[type][i][op_counter%4][0] // x
                tm.block.bricks[i+1][1] += operands[type][i][op_counter%4][1] // y    
            }

            break;
        case 3: // ㅣ
            console.log("type 3");
            for(let i = 0; i < 3; i++) {
                tm.block.bricks[i+1][0] += (operands[type][i][0] * (Math.pow(-1, op_counter+1))) ; // x
                tm.block.bricks[i+1][1] += (operands[type][i][1] * (Math.pow(-1, op_counter+1))) ; // y
            }
            break;
        case 4: // ㅗ
            console.log("type 4");
            for(let i = 0; i < 3; i++) {
                tm.block.bricks[i+1][0] += operands[type][(i+op_counter)%4][0]; // x
                tm.block.bricks[i+1][1] += operands[type][(i+op_counter)%4][1]; // y
            }
            break;
    }

    op_counter++;

    initializeDisplay();
    updateMap();
    detectClear();  

}

// create new block and automatically decide block type
function createNewBlock() {
    console.log('\t createNewBlock()');
    if(tm.isActive) {
        console.log("active");
        // apply playing block to status array
        //tm.status[tm.block.y_pos][tm.block.x_pos] = 0;        
    } else {
        console.log("not active");
        tm.isActive = true;
    }
    // new block creation position is (0,5)
    tm.block.x_pos = 5;
    tm.block.y_pos = 0;
    tm.block.type = Math.floor(Math.random() * 5);
    tm.block.bricks = createNewBricks(tm.block.type);
    op_counter = 0;
}

// create new bricks when block newly made
function createNewBricks(type) {
    let x = tm.block.x_pos;
    let y = tm.block.y_pos;
    
    let newBricks = Array(4);

    switch(type) {
        case 0: // ㅁ
            // (0,0) (1,0) (1,-1) (0,-1)
            newBricks[0] = [x,y];
            newBricks[1] = [x+1,y];
            newBricks[2] = [x+1,y-1];
            newBricks[3] = [x,y-1];
            break;
        case 1: // L
            // (0,0) (0,-1) (0,-2) (1,0)
            newBricks[0] = [x,y]
            newBricks[1] = [x,y-2]
            newBricks[2] = [x,y-1]
            newBricks[3] = [x+1,y]
            break;
        case 2: // Z
            //  (0,0) (-1,-1) (0,-1) (1,0)
            newBricks[0] = [x,y]
            newBricks[1] = [x-1,y-1]
            newBricks[2] = [x,y-1]
            newBricks[3] = [x+1,y]
            break;
        case 3: // ㅡ
            // (0,0) (0,-1) (0,-2) (0,-3)
            newBricks[0] = [x,y]
            newBricks[1] = [x,y-1]
            newBricks[2] = [x,y-2]
            newBricks[3] = [x,y-3]
            break;
        case 4: // ㅗ
            // (0,0) (1,0) (-1,0) (0,-1)
            newBricks[0] = [x,y]
            newBricks[1] = [x-1,y] // left
            newBricks[2] = [x,y-1] // upper
            newBricks[3] = [x+1,y] // right
            break;

    }
    console.log(newBricks);
    return newBricks;
}

// x_change, y_change - x and y axis variance
// get bricks position when move occurred
function getNewBricksPosition(x_change, y_change) {
    let newBricks = tm.getBricks();
    for(let i = 0; i < 4; i++) {
       newBricks[i][0] += x_change;
        newBricks[i][1] += y_change;
    }
    return newBricks;
}


// store current block's bricks position on status array
function setCurrentBlock() {
    let bricks = tm.block.bricks;
    for(let i=0; i<bricks.length; i++) {
        let x = tm.block.bricks[i][0] // x
        let y = tm.block.bricks[i][1] // y
        tm.status[y][x] = 1;
    }
}


// check all bricks whether collision will occurred or not
function detectCollision(newBricks) {
    for(let i = 0; i < newBricks.length; i++) {
        let x = newBricks[i][0]; // x
        let y = newBricks[i][1]; // y
        
        // check when block get into playground
        if(x>=0 && y>=0) {
            if(tm.status[y][x] >= 1) {
                return true
            }
        } 
    }
    return false;
}


// check wheter move will cause off-screen or not
function detectOffScreen(newBricks) {
    for(const brick of newBricks) {
        if(brick[0] < 0 || brick[0] > 9) {
            return true;
        }
    }
    return false;
}

// move block when there's no collision or off-screen play
function moveBlock(x_change, y_change) {

    if(!tm.isActive) {
        createNewBlock();
    } else {
        
        let newBricks = getNewBricksPosition(x_change, y_change);

        // detect off-screen move
        if(!detectOffScreen(newBricks)) {


            // detect collision
            if(detectCollision(newBricks)) {
                // only collision with y axis move makes new block
                if(y_change > 0) {
                    // collision occurred, save current block position
                    setCurrentBlock();
                    createNewBlock();
                }
            } else {
                // make block move
                tm.block.bricks = getNewBricksPosition(x_change, y_change);
                tm.block.x_pos = tm.block.bricks[0][0]; // x
                tm.block.y_pos = tm.block.bricks[0][1]; // y
            }
        }
    }
    // re-render playground
    initializeDisplay();
    updateMap();
    detectClear();   

}

// clearedList - array that has cleared line numbers
// clear cleared row, calculate game score, then drop down all above rows
function applyClear(clearedList) {
    console.log('\t applyClear()');

    let getScore = 0;
    if(clearedList.length > 2) {
        getScore = clearedList.length * 200;
    } else {
        getScore = clearedList.length * 100;
    }
    tm.score += getScore;
    
    // drop down all lines above the cleared line
    for(let i=0; i<clearedList.length; i++) {
        let clearedLine = clearedList[i];
        tm.status[clearedLine].fill(0);
        for (let r = clearedLine; r > 0; r--) {
            tm.status[r] = tm.status[r-1];
        }   
    }
}

// check the map whether line claer on every move
function detectClear() {
    let row = tm.mapSize.height;
    let col = tm.mapSize.width;
    // clearedList store cleared line number
    let clearedList = [];

    for(let r = 0; r < row; r++) { // ~16
        let sum = 0; 
        for(let c = 0; c < col; c++) { // ~10
            sum += tm.status[r][c];
        }
        if(sum >= 10) {
            clearedList.push(r);
        }
    }

    if(clearedList.length > 0) {
        applyClear(clearedList);
    }

}

function gameOver() {
    alert('game over');
}

function logKey(e) {
    document.querySelector('#keydown_status').innerHTML = `${e.code}`;

    temp_count++;
    if(temp_count > 10) {
        temp_count = 0;
        console.clear();
    }
}