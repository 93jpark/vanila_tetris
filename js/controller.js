'use strict';
console.log('controller is connected');

window.addEventListener('keydown', disableScroll);
document.addEventListener('keydown', detectKeyStroke);

// auto drop controller
let autoDrop;// = setInterval(()=>moveBlock(0, 1), 900);

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

function startGame() {
    tm = new TetrisMap(10, 16);
    initializeDisplay();

    tm.isActive = true;
    document.querySelector('#game_popup_container').style.display = 'none';
    createNewBlock();
    //autoDrop = setInterval(()=>moveBlock(0, 1), 900);

}

function gameOver() {
    tm.isActive = false;
    clearInterval(autoDrop);
    document.querySelector("#game_popup_container").style.display = 'block';
    //Game Over<br>Press Enter to play again
    document.querySelector("#popup_title").innerHTML = '😭😭😭 Game Over 😭😭😭';
    document.querySelector("#popup_title").style.top = '30%';
    document.querySelector("#popup_subtitle").innerHTML = 'Enter to play again🕹';
    document.querySelector("#popup_subtitle").style.top = '50%';
    document.querySelector("#popup_subtitle").style.fontSize = '1.5em';
}


// detect arrow key stroke, and make move with direction
function detectKeyStroke(e) {
    // up 38, left 37, right 39, down 40

    switch(e.keyCode) {
        case 13: // Enter
            if(!tm.isActive) {
                startGame();
            }        
            break;
        case 32: // space bar 
            if(tm.isActive){
                hardDrop();
            }
            break;
        case 37: // left
            if(tm.isActive) {
                moveBlock(-1, 0); break;
            }
        case 38: // up
            if(tm.isActive) {
                rotateBlock(); break;
            }
        case 39: // right
            if(tm.isActive) {
                moveBlock(1, 0); break;
            }
        case 40: // down
            if(tm.isActive) {
                moveBlock(0, 1);
                tm.score += 1;
            }
        default:
            //console.log('invalid key input');
        
    }
}

function hardDrop() {
    let total_y_changes = 0; // (0,1);
    let newBricks = tm.getBricks();
    let prev = tm.getBricks();
    let isDone = false;

    while(!isDone) {
        if(detectCollision(newBricks)) {
            isDone = true;
        } else {
            total_y_changes++;
            for(let i = 0; i < newBricks.length; i++) {
                prev[i][0] = newBricks[i][0];
                prev[i][1] = newBricks[i][1];
                newBricks[i][1] = tm.block.bricks[i][1] + total_y_changes;
            }
        }
    }
    tm.block.bricks = prev;
    tm.score += (total_y_changes*2);
    setCurrentBlock();
    createNewBlock();

    // re-render map
    initializeDisplay();
    updateMap();
    detectClear();
}


function rotateBlock() {
    if(tm.isActive) {
        const type = tm.block.type;
        let rotatedBricks = tm.getBricks();

        switch(type) {
            case 0: // ㅁ
                console.log("type 0");
                break;
            case 1: // L
                console.log("type 1");
                for(let i = 0; i < 3; i++) {
                    rotatedBricks[i+1][0] += operands[type][i][op_counter%4][0] // x
                    rotatedBricks[i+1][1] += operands[type][i][op_counter%4][1] // y    
                }
                break;
            case 2: // z
                console.log("type 2");
                for(let i = 0; i < 3; i++) {
                    rotatedBricks[i+1][0] += operands[type][i][op_counter%4][0] // x
                    rotatedBricks[i+1][1] += operands[type][i][op_counter%4][1] // y    
                }

                break;
            case 3: // ㅣ
                console.log("type 3");
                for(let i = 0; i < 3; i++) {
                    rotatedBricks[i+1][0] += (operands[type][i][0] * (Math.pow(-1, op_counter+1))) ; // x
                    rotatedBricks[i+1][1] += (operands[type][i][1] * (Math.pow(-1, op_counter+1))) ; // y
                }
                break;
            case 4: // ㅗ
                console.log("type 4");
                for(let i = 0; i < 3; i++) {
                    rotatedBricks[i+1][0] += operands[type][(i+op_counter)%4][0]; // x
                    rotatedBricks[i+1][1] += operands[type][(i+op_counter)%4][1]; // y
                }
                break;
        }

        if(!detectCollision(rotatedBricks) && !detectOffScreen(rotatedBricks)) {
            console.log("rotating success")
            tm.block.bricks = rotatedBricks;
            op_counter++;
        }

        initializeDisplay();
        updateMap();
        detectClear(); 
    }
     

}

// create new block and automatically decide block type
function createNewBlock() {
    if(tm.isActive) {
        // new block creation position is (0,4)
        
        tm.block.x_pos = 4;
        tm.block.y_pos = 0;
        tm.block.type = Math.floor(Math.random() * 5);
        tm.block.bricks = createNewBricks(tm.block.type);
        op_counter = 0;    
    }
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
        if(y < 0 ) {
            gameOver();
        } else {
            tm.status[y][x] = 1;
        }
        
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

    if(tm.isActive) {
        
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
    //console.log('\t applyClear()');

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
    initializeDisplay();
    updateMap();
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

