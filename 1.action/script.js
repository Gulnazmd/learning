    function getClearValue(s){
        var result = s.substring(0, s.length-2);
        return result.length == 0 ? 0 : Number.parseInt(result);
    }
    function moveX(el, step){
        var next = getClearValue(el.style.left) + step;
        if (next > 350 | next < 0){
            return
        }
        el.style.left = next + "px";
    }
    function moveY(el, step){
        var next = getClearValue(el.style.top) + step;
        if (next > 350 | next < 0){
            return
        }
        el.style.top = next + "px";
    }

    document.addEventListener('keypress', event => {
      var box = document.getElementById("box");
      var step = 50;
        if (event.keyCode === 87) {
            // up arrow
            moveY(box, -step);
        }
        else if (event.keyCode === 83) {
            // down arrow
            moveY(box, step);
        }
        else if (event.keyCode === 65) {
           // left arrow
           moveX(box, -step);
        }
        else if (event.keyCode === 68) {
           // right arrow
           moveX(box, step);
        } 
    });
