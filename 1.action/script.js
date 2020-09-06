window.onload = function (){

    var leftPos = 0;
    var topPos = 0;
    var box = document.getElementById("box");
    var actionRight = setInterval(moveRight, 10);
    var actionDown = setInterval(moveDown, 10);

    function moveRight() {
        if(box.style.left == "350px") {
            clearInterval(actionRight);
            return;
        } else {
            leftPos+=1;
            box.style.left = leftPos + "px";
        }
    }

    function moveDown() {
        if(box.style.top == "350px") {
            clearInterval(actionDown);
            return;
        } else {
            topPos+=1;
            box.style.top = topPos + "px";
        }
    }   
    
}