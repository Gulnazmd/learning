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
