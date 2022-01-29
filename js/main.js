const SLIDER = document.getElementById('slider');
let body = document.getElementsByTagName('body');
let slides = SLIDER.querySelectorAll('.slider__list-item');
let buttonLeft = SLIDER.querySelector('.left-btn');
let buttonRight = SLIDER.querySelector('.right-btn');
let slidesLength = slides.length;

let currentIndex = 0;
let startTouch = {
    x: null,
    y: null
}
let endTouch = {
    x: null,
    y: null
}
console.log(slides, buttonLeft, buttonRight, slidesLength)
buttonRight.onclick = () => {
    moveRight()
};
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
    clearActiveClass();
    addActiveClass(currentIndex);
    changeBackground()
}

function moveLeft() {
    if (currentIndex !== 0) {
        currentIndex--
    } else {
        currentIndex = slidesLength - 1;
    }
    clearActiveClass();
    addActiveClass(currentIndex);
    changeBackground()
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
