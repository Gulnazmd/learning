window.onload = function() {
    var elements = document.getElementsByClassName("answer");
    for (let i = 0; i < elements.length; i++){
        elements[i].addEventListener("drop", onDrop, false);
        elements[i].addEventListener("dragover", onDragover, false);
    };
    var btn = document.getElementById("myCheck"); 
    btn.addEventListener("click", onClick, false);

    var variants = document.getElementsByClassName("variant");
    for (let i = 0; i < variants.length; i++){
        variants[i].addEventListener("dragstart",onDragstart, false);
        variants[i].draggable = true;
    };
}

function onDragover(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    if (event.target.className == "variants" 
        || event.target.querySelector(".variant") == null 
        && event.target.className !== "variant")  
    {
        var id = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(id)); 
    }
}

function onDragstart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function onClick(){
    let correctAnwers = ["0", "2", "1"];
    let elements = document.getElementsByClassName("answer");
    let answers = new Array(elements.length);
    let a = 0;
    for (let i = 0; i < elements.length; i++){
        let variant = elements[i].querySelector(".variant");
        if (variant) {  
            answers[i] = variant.id.substring(8);
            if (correctAnwers[i] == answers[i]) {
                a++;
            }
        }
    } 
    alert(`Correct answers: ${a}`);
}
