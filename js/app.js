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



//fillCoordinatePoint(9,15);
//createNewBlock();

