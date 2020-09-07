
    document.addEventListener('keypress', event => {
      var box = document.getElementById("box");
        if (event.keyCode === 87) {
            // up arrow
            box.style.top = "0px";
        }
        else if (event.keyCode === 83) {
            // down arrow
            box.style.top = "350px";
        }
        else if (event.keyCode === 65) {
           // left arrow
           box.style.left = "0px";
        }
        else if (event.keyCode === 68) {
           // right arrow
           box.style.left = "350px";
        } 
    });
