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
            deliverBrickChange(0, 1);
            console.log("up"); break;
       case 39: // right
            deliverBrickChange(1, 0);
            console.log("right"); break;
        case 40: // down
            deliverBrickChange(0, -1);
            console.log("down"); break;
        default:
            console.log('invalid key input');
        
    }
}

function deliverBrickChange(x_change, y_change) {
    let x_pos = tm.brick.x_pos;
    let y_pos = tm.brick.y_pos;
    if( x_pos < tm.mapSize.widht-1 && x_pos > 0 ) {
        tm.brick.x_pos += x_change;
    }

    if( y_pos < tm.mapSize.height-1 && y_pos > 0 ) {
        tm.brick.y_pos += y_change;
    }
    console.log(`x: ${tm.brick.x_pos}, y: ${tm.brick.y_pos}`);
    
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

