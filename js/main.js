const SLIDER = document.getElementById('slider');
let body = document.getElementsByTagName('body');
let slides = SLIDER.querySelectorAll('.slider__list-item');
let buttonLeft = SLIDER.querySelector('.left-btn');
let buttonRight = SLIDER.querySelector('.right-btn');
let slidesLength = slides.length;

let currentIndex = 0;
console.log(slides,buttonLeft,buttonRight,slidesLength)
buttonRight.onclick = () =>{moveRight()};
buttonLeft.onclick = moveLeft;

function changeBackground() {
    document.body.style.backgroundImage=`url(${slides[currentIndex].firstChild.currentSrc})`;
}
function moveRight() {
    console.log('move')
    if(currentIndex < slidesLength - 1) {
        currentIndex++
    }
    else {
        currentIndex = 0;
    }
    clearActiveClass();
    addActiveClass(currentIndex);
    changeBackground()
}
function moveLeft() {
    if(currentIndex !== 0) {
        currentIndex--
    }
    else {
        currentIndex = slidesLength-1;
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
    slides.forEach((element,index) => {
        if(index === current) {
            element.classList.add('active')
        }
    })
}
