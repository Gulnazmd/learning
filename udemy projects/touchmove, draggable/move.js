//button cool effect

const myBtns = document.querySelectorAll('.ripple')
function reloadMyPage() {
    document.location.reload();
    return false
}



const showCircle = document.querySelector('.showCircle')
showCircle.addEventListener('click', function (e) {
    const x = e.clientX
    const y = e.clientY

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

        const createCircles = (e) => {
        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = `${yInside}px`
        circle.style.left = `${xInside}px`
        
            this.appendChild(circle)

       // setTimeout(() => circle.remove(), 500)
}
createCircles()
})

// drag-and-drop 
var currentFillId = '';
const fills = document.getElementsByClassName('fill')
const empties = document.getElementsByClassName('empty')

for(const fill of fills) {
    fill.addEventListener('dragstart', dragStart);
    fill.addEventListener('touchstart', dragStart)
    fill.addEventListener('dragend', dragEnd);
    fill.addEventListener('touchend', dragEnd);
}

for(const empty of empties){
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('touchmove', dragOver)
    empty.addEventListener('dragenter', dragEnter)   
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

function dragStart(e) {
    this.className += ' hold'
    e.dataTransfer.setData("id", e.target.id);
    currentFillId = e.target.id;
    setTimeout(() => this.className = 'invisible', 0)
}

function dragEnd() {
    this.className = 'fill'
    checkAnswer()
}

function dragOver(e) {
    e.preventDefault()
}

function dragLeave() {
    this.className = 'empty'

}

function dragEnter(e) {
    if (!currentFillId){
        return;
    }

    if (!currentFillId.includes('fill-')){
        return;
    }   
    
    if (checkAnswer(this.id, currentFillId) == true){
        this.classList.remove('wrong');
        this.classList.add('correct');      
    } else {
        this.classList.add('wrong');
    }
    
}

function dragDrop(e) {
    currentFillId = "";
    this.className = 'empty'
    var id = e.dataTransfer.getData("id");
    if (checkAnswer(this.id, id) == true){
            this.className = 'empty'
                const parent = document.querySelector('#' + this.id).parentNode;
                const paragraph = parent.querySelector('p');
                paragraph.classList.add('read');
    } else {
        return false;
    }
    const fill = document.getElementById(id);
    this.append(fill)
}

// correct or wrong 

function checkAnswer(boxId, fillId) {
    if((boxId == "empty-1" && fillId == "fill-2")
        || (boxId == "empty-2" && fillId == "fill-4")
        || (boxId == "empty-3" && fillId == "fill-1")
        || (boxId == "empty-4" && fillId == "fill-3")
        ) {
        return true;
    } else {
        return false;
    }
}
