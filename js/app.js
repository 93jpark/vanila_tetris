function loadScript(url) {    
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

// loadScript('./js/controller.js');
// loadScript('./js/view.js');
// loadScript('./js/model.js');


let tm = new TetrisMap(10, 16);




/* GLOBAL CONST for canvas */
const CANVAS = document.querySelector('#playground');
const BRICK_SIZE = 50;

let ctx = CANVAS.getContext('2d');
ctx.stroke();
ctx.lineWidth = 0.1;

initializeDisplay();
//fillCoordinatePoint(9,15);
createNewBrick();

