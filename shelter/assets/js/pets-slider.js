'use strict';

let $sliderItems = document.querySelector('.slider__items');
let $numberOfPage = document.querySelector('.current-page-number');
let $sliderButtons = document.querySelectorAll('.pagination');
let $indexes = getRandomNumbers(48, 8);
let $collection = [];
let $currentPage = 0;
let $firstOfCollectionItem = 0;
let $pressedButton

fetch('../../assets/json/pets.json')
    .then(res => {
        return res.json();
    }).then(data => {
        let pets = data;

        console.log('Generated Array: ', $indexes)
        // 648px 1200px ;
        createSlides(3, $sliderItems, 'slider__slide-item');
        getInitialCollection($indexes, 0, pets, 'current');

        // Resolution monitoring:
        window.addEventListener('resize', () => {
            getInitialCollection($indexes, 0, pets, 'current');
            $numberOfPage.textContent = $currentPage + 1;
            $sliderButtons.forEach(item => {
                item.addEventListener('click', getStep);
            });

            checkPaginations($currentPage);
        });

        $sliderButtons.forEach(item => {
            item.addEventListener('click', getStep);
        })

        $sliderItems.addEventListener('animationend', () => {
            $sliderItems.classList.remove('moving-right');
            $sliderItems.classList.remove('moving-left');
            $sliderItems.classList.remove('moving-right-fast');
            $sliderItems.classList.remove('moving-left-fast');
            getInitialCollection($indexes, 0, pets, 'current');
            document.querySelectorAll('.slider__slide-item').forEach(item => {
                if (item.classList.contains('next') || item.classList.contains('prev')) {
                    item.innerHTML = '';
                }
            })
            $sliderButtons.forEach(item => {
                item.addEventListener('click', getStep);
            })
        })

        // Get next/prev/last/first step: 
        function getStep(e) {
            let t = e.target;
            if (t.classList.contains('next') && !t.disabled && $collection.length - 1 > $currentPage) {
                $pressedButton = 'next';
                $currentPage += 1;
                $numberOfPage.textContent = $currentPage + 1;
                checkPaginations($currentPage);
                getInitialCollection($indexes, 1, pets, 'next');
                $sliderItems.classList.add('moving-right');
            }

            if (t.classList.contains('prev') && !t.disabled && 0 < $currentPage) {
                $pressedButton = 'prev';
                $currentPage -= 1;
                $numberOfPage.textContent = $currentPage + 1;
                checkPaginations($currentPage);
                getInitialCollection($indexes, -1, pets, 'prev');
                $sliderItems.classList.add('moving-left');
            }

            if (t.classList.contains('first') && !t.disabled && 0 < $currentPage) {
                $pressedButton = 'first';
                $firstOfCollectionItem = 0;
                $currentPage = 0;
                $numberOfPage.textContent = $currentPage + 1;
                checkPaginations($currentPage);
                getInitialCollection($indexes, 0, pets, 'prev');
                $sliderItems.classList.add('moving-left-fast');
            }

            if (t.classList.contains('last') && !t.disabled) {
                $pressedButton = 'last';
                $firstOfCollectionItem = $collection[$collection.length - 1][0].current;
                $currentPage = $collection.length - 1;
                $numberOfPage.textContent = $currentPage + 1;
                checkPaginations($currentPage);
                getInitialCollection($indexes, 0, pets, 'next');
                $sliderItems.classList.add('moving-right-fast');
            }
            $sliderButtons.forEach(item => {
                item.removeEventListener('click', getStep);
            })
        }
    })

checkPaginations($currentPage);

// Sledes maker: 
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

// Cards creator:
function createCards(indexes, arr, targetParentClass) {
    let sliderItems = document.querySelectorAll('.slider__slide-item');
    sliderItems.forEach(item => {
        if (item.classList.contains(targetParentClass)) {
            item.innerHTML = '';

            indexes.forEach((index, i, array) => {
                let cardTemplate = `<div class="slider__card card" data-card-id="${arr[index.random].name.toLowerCase()}">
                                    <img src="${arr[index.random].img}" alt="Pet ${arr[index.random].name} picture" class="card__image"></img>
                                     <!-- /.card__image -->
                                     <h3 class="card_title">${arr[index.random].name}</h3>
                                     <!-- /.card_title -->
                                     <button class="card__button button-main">Learn more</button>
                                     <!-- /.card__button -->
                                 </div>`;
                item.innerHTML += cardTemplate;
            })
        }
    })
}

// Indexes Generator:
function getRandomNumbers(max, sep) {
    let outputData = []
    for (let i = 0; i < max / sep; i++) {
        let nums = [];

        for (let n = 0; n < sep; n++) {
            let number = Math.floor(Math.random() * sep);
            (!nums.includes(number)) ? nums.push(number) : n--;
        }

        outputData.push(...nums);
    }

    outputData = outputData.map((item, i, arr) => {
        return item = {
            random: item,
            current: i
        }
    })

    return outputData;
}

// Indexes Separator:
function separateArray(arr, quantity = 8) {
    let outputData = [];
    let separetingItems = [];

    for (let i = 0; i < arr.length; i++) {
        if (separetingItems.length < quantity) {
            separetingItems.push(arr[i]);
        } else {
            outputData.push(separetingItems);
            separetingItems = [];
            --i;
        }

        if (arr[i + 1] == undefined) outputData.push(separetingItems);
    }

    return outputData;
}

// Initial collection of cars generator:
function getInitialCollection(arrIndexes, plusStep, arr, targetClass) {
    let separatedIndexes;
    let pageInNewCollection;
    let curPage = $currentPage;
    if (window.innerWidth > 1200) {
        separatedIndexes = separateArray(arrIndexes, 8);
    }

    if (window.innerWidth < 1200 && window.innerWidth > 649) {
        separatedIndexes = separateArray(arrIndexes, 6);
    }

    if (window.innerWidth < 649) {
        separatedIndexes = separateArray(arrIndexes, 3);
    }

    pageInNewCollection = getCurrentPage($firstOfCollectionItem, separatedIndexes);
    createCards(separatedIndexes[pageInNewCollection + plusStep], arr, targetClass);

    $collection = separatedIndexes;
    $firstOfCollectionItem = separatedIndexes[pageInNewCollection + plusStep][0].current;
    $currentPage = pageInNewCollection;
}

// Search num in arr and get current page:
function getCurrentPage(n, arr) {
    let curPage
    arr.forEach((item, i) => {
        item.forEach(elem => {
            if (elem.current == n) curPage = i;
        })
    })

    return curPage;
}

// Check pagination: 
function checkPaginations(value) {
    $sliderButtons.forEach(item => {
        if (value == 0) {
            if (item.classList.contains('prev') || item.classList.contains('first')) {
                item.disabled = true;
            }
        }
        if (value != 0) {
            if (item.classList.contains('prev') || item.classList.contains('first')) {
                item.disabled = false;
            }
        }

        if (value + 1 == $collection.length) {
            if (item.classList.contains('next') || item.classList.contains('last')) {
                item.disabled = true;
            }
        } else {
            if (item.classList.contains('next') || item.classList.contains('last')) {
                item.disabled = false;
            }
        }
    })
}