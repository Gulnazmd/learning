window.onload = function (){

    var leftPos = 0;
    var topPos = 0;
    var box = document.getElementById("box");
    var actionRight = setInterval(moveRight, 10);

    function moveRight() {
        if(box.style.left == "350px") {
            clearInterval(action);
            return;
        } else {
            leftPos+=1;
            box.style.left = leftPos + "px";
        }
    }
    
}