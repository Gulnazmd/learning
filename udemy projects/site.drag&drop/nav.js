const toggle = document.getElementById('toggle')
const about = document.getElementById('about')

toggle.addEventListener('click', () => {
    about.classList.toggle('open')
})

// counter
const calc = document.querySelector('.counter-container');

window.addEventListener('scroll', showCounter);
showCounter();
function showCounter() {
    const triggerBottom = window.innerHeight / 5 * 4;

        const boxTop = calc.getBoundingClientRect().top;

        const counters = document.querySelectorAll('.counter')
            counters.forEach(counter => {
            counter.innerHTML = '0'
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target')
                const c = +counter.innerText

        const increment = target / 450

        if(c < target && boxTop < triggerBottom) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }
    updateCounter()
})
    }



// slider

const container = document.getElementById('main-container')
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

let activeSlide = 0

// slider buttons

rightBtn.addEventListener('click', () => {
    nextSlide();
})

function nextSlide(){
    activeSlide++

    if(activeSlide > slides.length - 1) {
        activeSlide = 0
    }

    setBgtoMainContainer()
    setActiveSlide()
}

leftBtn.addEventListener('click', () => {
    activeSlide--

    if(activeSlide < 0) {
        activeSlide = slides.length - 1
    }

    setBgtoMainContainer()
    setActiveSlide()
})

setBgtoMainContainer()

function setBgtoMainContainer(){
    container.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

function setActiveSlide() {
    slides.forEach((slide) => slide.classList.remove('active'))

    slides[activeSlide].classList.add('active')
}
// slide changing

setInterval(() => nextSlide(), 3000);


// scroll 

const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const bottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < bottom) {
            box.classList.add('rotate')
        } else {
            box.classList.remove('rotate')
        }
    })
}

const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('show')
    } else {
        nav.classList.remove('show')
    }
}

//button cool effect

const myBtns = document.querySelectorAll('.ripple')

myBtns.forEach(button => {
        button.addEventListener('click', function (e) {
        const x = e.pageX 
        const y = e.pageY

        const buttonTop = e.target.offsetTop 
        const buttonLeft = e.target.offsetLeft 

        const xInside = x - buttonLeft 
        const yInside = y - buttonTop
        

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'
    console.log( circle.style.left)
        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
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
