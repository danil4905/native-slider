const SLIDER = document.getElementById('slider');
let body = document.getElementsByTagName('body');
let slides = SLIDER.querySelectorAll('.slider__list-item');
let buttonLeft = SLIDER.querySelector('.left-btn');
let buttonRight = SLIDER.querySelector('.right-btn');
let dotsBox = document.querySelector('#dots');
let slidesLength = slides.length;
let dot = document.createElement('div')
dot.className = 'dot';
let currentIndex = 0;
let startTouch = {
    x: null,
    y: null
}
let endTouch = {
    x: null,
    y: null
}
createDots()


function dotSelect(event) {
    const id = event.target.getAttribute('data');
    currentIndex = Number(id) - 1;
    changeSlide()
}

function createDots() {
    for (let i = 0; i < slidesLength; i++) {
        dotsBox.appendChild(document.createElement('button'));
    }
    dotsBox.childNodes.forEach((element, index) => {
        if (element.nodeName === 'BUTTON') {
            element.className = 'dot';
            element.onclick = dotSelect
            element.setAttribute('data', `${index}`)
        }
    })
}

let dots = document.querySelectorAll('.dot');

function activateDot() {
    dots.forEach(element => {
        element.classList.remove('activeDot')
    })
    dots[currentIndex].classList.add('activeDot')
}


buttonRight.onclick = moveRight;
buttonLeft.onclick = moveLeft;

SLIDER.addEventListener('touchstart', (event) => {
    startTouch.x = event.touches[0].clientX;
    startTouch.y = event.touches[0].clientY;
}, false)
SLIDER.addEventListener('touchmove', checkAction, false)

function checkAction(event) {
    endTouch.x = event.touches[0].clientX;
    endTouch.y = event.touches[0].clientY;
    if (!startTouch.x || !startTouch.y) {
        return false
    }
    let xDiff = endTouch.x - startTouch.x
    let yDiff = endTouch.y - startTouch.y
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            moveRight()
        } else {
            moveLeft()
        }
    } else {
        return false
    }
    startTouch.x = null;
    startTouch.y = null;
}

changeBackground()
activateDot()

function changeBackground() {
    document.body.style.backgroundImage = `url(${slides[currentIndex].firstChild.currentSrc})`;
}

function moveRight() {
    console.log('move')
    if (currentIndex < slidesLength - 1) {
        currentIndex++
    } else {
        currentIndex = 0;
    }
    changeSlide()
}

function moveLeft() {
    if (currentIndex !== 0) {
        currentIndex--
    } else {
        currentIndex = slidesLength - 1;
    }
    changeSlide()
}


function clearActiveClass() {
    slides.forEach((element) => {
        element.classList.remove('active')
    })
}

function addActiveClass(current) {
    slides.forEach((element, index) => {
        if (index === current) {
            element.classList.add('active')
        }
    })
}

function changeSlide() {
    clearActiveClass();
    addActiveClass(currentIndex);
    changeBackground()
    activateDot()
}
