'use strict';
console.log('controller is connected');

document.addEventListener('keydown', logKey);
window.addEventListener('keydown', disableScroll);
document.querySelector('#res_status').innerHTML = `${CANVAS.offsetWidth} * ${CANVAS.offsetHeight}`;

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