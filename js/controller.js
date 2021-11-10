'use strict';
console.log('controller is connected');

document.addEventListener('keydown', logKey);
window.addEventListener('keydown', disableScroll);
document.addEventListener('keydown', detectKeyStroke);
//document.querySelector('#res_status').innerHTML = `${CANVAS.offsetWidth} * ${CANVAS.offsetHeight}`;

let temp_count = 0; // will be removed later


function disableScroll(e) {
    switch(e.code) {
        case "ArrowUp": case "ArrowDown": 
        case "ArrowLeft": case "ArrowRight" : case "Space": 
        e.preventDefault(); // prevent scoll viewpoint of browser.
        break;

        default: break; // pass other keys
    }
}

function detectKeyStroke(e) {
    // up 38, left 37, right 39, down 40
    switch(e.keyCode) {
        case 37: // left
            deliverBrickChange(-1, 0);
            console.log("left"); break;
        case 38: // up
            deliverBrickChange(0, -1);
            console.log("up"); break;
       case 39: // right
            deliverBrickChange(1, 0);
            console.log("right"); break;
        case 40: // down
            deliverBrickChange(0, 1);
            console.log("down"); break;
        default:
            console.log('invalid key input');
        
    }
}

function deliverBrickChange(x_change, y_change) {
    let prev = { x: tm.brick.x_pos, y: tm.brick.y_pos };
    let next = { x: tm.brick.x_pos, y: tm.brick.y_pos };
        
    
    if( prev.x+x_change >= 0 && prev.x+x_change <= tm.mapSize.width-1 ) {
        next.x = tm.brick.x_pos + x_change;
    } 

    if( prev.y+y_change >= 0 && prev.y+y_change <= tm.mapSize.height ) {
        next.y = tm.brick.y_pos + y_change;
    }

    if(detectCollision(next)) {
        createNewBrick();
    } else {
        tm.brick.x_pos = next.x;
        tm.brick.y_pos = next.y;
    }

    initializeDisplay();
    updateMap();
    

}

// create new brick
function createNewBrick() {
    if(tm.isActive) {
        console.log(`prev one's position : ${tm.brick.x_pos}, ${tm.brick.y_pos}`);
        tm.status[tm.brick.y_pos][tm.brick.x_pos] = 1;        
    } else {
        tm.isActive = true;
    }
    tm.brick.x_pos = 5;
    tm.brick.y_pos = 0;
}

// detect collision against existing bricks or bottom, and return true/false
function detectCollision(next) {
    // collision against bottom line
    if(next.y == 16) {
        return true;
    }
    
    // collision against existing brick
    if (tm.status[next.y][next.x]>0) {
        return true;
    } else {
        console.log("\tpass!!");
        return false;
    }
}



function logKey(e) {
    //console.log(`${e.code} is pressed`);
    console.log(`${e.keyCode} is pressed`);
    document.querySelector('#keydown_status').innerHTML = `${e.code}`;

    temp_count++;
    if(temp_count > 10) {
        temp_count = 0;
        console.clear();
    }
}


// // monitor whether focus status
// if (CANVAS.hasFocus) {
//     document.querySelector('#focus_status').innerHTML = `out`;
// } else {
//     document.querySelector('#focus_status').innerHTML = `in`;
// }

