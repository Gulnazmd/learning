    function getClearValue(s){
        var result = s.substring(0, s.length-2);
        return result.length == 0 ? 0 : Number.parseInt(result);
    }
    function moveX(el, step){
        var next = getClearValue(el.style.left) + step;
        var top = getClearValue(el.style.top);
        if (next < 0 ||  next > 350){
            return
        }    
        if ((next == 150 || next == 200) && (top == 150 || top == 200)){
            return
        } 
        el.style.left = next + "px";
    }
    function moveY(el, step){
        var next = getClearValue(el.style.top) + step;
        var left = getClearValue(el.style.left);
        if (next < 0 || next > 350){
            return
        }
        if ((next == 150 || next == 200) && (left == 150 || left == 200)){
            return
        }        
        el.style.top = next + "px";
    }

    document.addEventListener('keypress', event => {
      var box = document.getElementById("box");
      var step = 50;
        if (event.keyCode === 87) {
            // up 
            moveY(box, -step);
        }
        else if (event.keyCode === 83) {
            // down 
            moveY(box, step);
        }
        else if (event.keyCode === 65) {
           // left 
           moveX(box, -step);
        }
        else if (event.keyCode === 68) {
           // right 
           moveX(box, step);
        } 
    });
    var sphere = document.getElementById("sphere");
    sphere.onclick = function() {
    let start = Date.now();
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        sphere.style.left = timePassed / 5 + 'px';
        if (timePassed > 1500) 
            clearInterval(timer);
        }, 20)
    }