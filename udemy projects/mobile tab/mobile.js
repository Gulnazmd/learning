//button cool effect

const myBtns = document.querySelectorAll('.ripple')
function reloadMyPage() {
    document.location.reload();
    return false
}
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
// change pages

const btnHome = document.getElementById("btnHome");
const mainPage = document.getElementById("mainPage");
const game = document.getElementById("game");
const btnQuestion = document.getElementById("btnQuestion");
const btnContact = document.getElementById("btnContact")
const contacts = document.getElementById("contacts");
const drawing = document.getElementById("drawing");
const btnDraw = document.getElementById("btnDraw");
const viber = document.getElementById("viber")
const btnViber = document.getElementById("btnViber");

btnHome.addEventListener("click", () => {
    mainPage.classList.add('show')
    game.classList.remove('show')
    contacts.classList.remove('show')
    drawing.classList.remove('show')
    viber.classList.remove('show')
})

btnQuestion.addEventListener("click", () => {
    game.classList.add('show')
    mainPage.classList.remove('show')
    contacts.classList.remove('show')
    drawing.classList.remove('show')
    viber.classList.remove('show')
})

btnContact.addEventListener("click", () => {
    contacts.classList.add('show')
    mainPage.classList.remove('show')
    game.classList.remove('show')
    drawing.classList.remove('show')
    viber.classList.remove('show')
})

btnDraw.addEventListener("click", () => {
    drawing.classList.add('show')
    contacts.classList.remove('show')
    mainPage.classList.remove('show')
    game.classList.remove('show')
    viber.classList.remove('show')
})
btnViber.addEventListener('click', () => {
    viber.classList.add('show')
    drawing.classList.remove('show')
    contacts.classList.remove('show')
    mainPage.classList.remove('show')
    game.classList.remove('show')
})

// clock

// clock 


const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];

function setTime(){
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hours, 0, 12, 0, 360)}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;
    
    timeEl.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}`: minutes}`
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>` ;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
setTime()

setInterval(setTime, 1000)

// canvas drawing

const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const clearBtn = document.getElementById('clear');
const colorEl = document.getElementById('color');
const sizeEl = document.getElementById('size');
const ctx = canvas.getContext('2d');

let size = 5;
let color = 'black'
let x
let y
let isPressed = false
 
// touch devices

canvas.addEventListener("touchstart", function (e) {
    isPressed = true
    var touch = e.touches[0];
        x = touch.clientX
        y = touch.clientY
});

canvas.addEventListener("touchend", function (e) {
    isPressed = false

    x = undefined
    y = undefined
})
canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    if(isPressed){
        x2 = touch.clientX
        y2 = touch.clientY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2 
    }
    })

// mouse evens

canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed){
        x2 = e.offsetX
        y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    } 
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill()
}
function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}
// btns

function updateSizeEl() {
    sizeEl.innerText = size
}
increaseBtn.addEventListener('click', () => {
    size += 5
    if(size > 30) {
        size = 30
    }
    updateSizeEl()
})

decreaseBtn.addEventListener('click', () => {
    size -= 5
    if(size < 5) {
        size = 5
    }
    updateSizeEl()
})

colorEl.addEventListener('change', (e) => color = e.target.value )
clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))


