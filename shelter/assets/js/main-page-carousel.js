'use strict'

let sliderItems = document.querySelector('.slider__items');
let sliderButtonLeft = document.querySelectorAll('.slider__button-left');
let sliderButtonRight = document.querySelectorAll('.slider__button-right');
let pressedButton;
let previousIndexes = [];
let currentIndexes;

let getResponse = async (url) => {
    let response = await fetch(url);
    let pets = await response.json();

    // console.log(pets)

    createSlides(3, sliderItems, 'slider__slide-item');

    currentIndexes = getRandomItems(pets);
    createCards(currentIndexes, pets, 'current');

    sliderButtonRight.forEach(item => {
        item.addEventListener('click', stepRight);
    })

    sliderButtonLeft.forEach(item => {
        item.addEventListener('click', stepLeft)
    })


    sliderItems.addEventListener('animationend', () => {
        sliderItems.classList.remove('moving-right');
        sliderItems.classList.remove('moving-left');
        createCards(currentIndexes, pets, 'current');
        sliderButtonRight.forEach(item => {
            item.addEventListener('click', stepRight);
        })
        sliderButtonLeft.forEach(item => {
            item.addEventListener('click', stepLeft)
        })
        // console.log('from end: ', currentIndexes);
    })

    function stepRight() {
        if (pressedButton == 'lb') {
            let currentIndexesCopy = currentIndexes;
            currentIndexes = previousIndexes;
            previousIndexes = currentIndexesCopy;
        } else {
            previousIndexes = currentIndexes;
            currentIndexes = getRandomItems(pets);
        }
        pressedButton = 'rb';
        sliderItems.classList.add('moving-right');
        createCards(currentIndexes, pets, 'next');
        sliderButtonRight.forEach(item => {
            item.removeEventListener('click', stepRight);
        })
        sliderButtonLeft.forEach(item => {
            item.removeEventListener('click', stepLeft)
        })
        // console.log('from click: ', currentIndexes);
    }

    function stepLeft() {
        if (pressedButton == 'rb') {
            let currentIndexesCopy = currentIndexes;
            currentIndexes = previousIndexes;
            previousIndexes = currentIndexesCopy;
        } else {
            previousIndexes = currentIndexes;
            currentIndexes = getRandomItems(pets);
        }
        pressedButton = 'lb';
        sliderItems.classList.add('moving-left');
        createCards(currentIndexes, pets, 'prev');
        sliderButtonRight.forEach(item => {
            item.removeEventListener('click', stepRight);
        })
        sliderButtonLeft.forEach(item => {
            item.removeEventListener('click', stepLeft)
        })
        // console.log('from click: ', currentIndexes);
    }
};

getResponse('../../assets/json/pets.json');

function createSlides(quantity, appendBlock, addClass) {
    let focusedElement = Math.floor(quantity / 2);
    for (let i = 0; i < quantity; i++) {
        let div = document.createElement('div');
        div.classList.add(addClass);
        if (i == focusedElement) div.classList.add('current');
        if (i < focusedElement) div.classList.add('prev');
        if (i > focusedElement) div.classList.add('next');
        appendBlock.append(div);
    }
}

function createCards(indexes, arr, targetParentClass) {
    let sliderItems = document.querySelectorAll('.slider__slide-item');
    sliderItems.forEach(item => {
        if (item.classList.contains(targetParentClass)) {
            item.innerHTML = '';

            indexes.forEach((index, i, array) => {
                let addClass = 'd-default';
                if (i == 1) {
                    addClass = 'd-745px-none'
                }
                if (i == 2) {
                    addClass = 'd-1000px-none'
                }
                let cardTemplate = `<div class="slider__card card ${addClass}" data-card-id="${arr[index].name.toLowerCase()}">
                                    <img src="${arr[index].img}" alt="Pet ${arr[index].name} picture" class="card__image"></img>
                                     <!-- /.card__image -->
                                     <h3 class="card_title">${arr[index].name}</h3>
                                     <!-- /.card_title -->
                                     <button class="card__button button-main">Learn more</button>
                                     <!-- /.card__button -->
                                 </div>`;
                item.innerHTML += cardTemplate;
            })
        }
    })
}

function getRandomItems(arr, quanity = 3) {
    let max = arr.length;
    let arrNums = [];

    for (let i = 0; i < quanity; i++) {
        let num = Math.floor(Math.random() * max);
        if (!arrNums.includes(num) && !previousIndexes.includes(num)) {
            arrNums.push(num);
        } else {
            i--;
        }
    }

    return arrNums;
}

