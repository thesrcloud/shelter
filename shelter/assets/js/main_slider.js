let data = fetch("../../assets/json/pets.json");

let isMobile = window.matchMedia("(max-width: 610px)");
let isTablet = window.matchMedia("(min-width: 611px) and (max-width: 960px)");
let isDesktop = window.matchMedia("(min-width: 961px)");
const sliderCarousel = document.querySelector(".slider__carousel");
const prevSlide = document.querySelector(".card-block-prev");
const centerSlide = document.querySelector(".card-block-center");
const nextSlide = document.querySelector(".card-block-next");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
let lastSlideIDs = [];
let currentSlideIDs = [];

data
  .then((response) => response.json())
  .then((result) => {
    let data = result;

    generateSlideIDs(currentSlideIDs);

    makeCards(data, currentSlideIDs, centerSlide);

    prevBtn.addEventListener("click", getPrevSlide);
    nextBtn.addEventListener("click", getNextSlide);

    isMobile.addEventListener("change", restartSlider);
    isTablet.addEventListener("change", restartSlider);
    isDesktop.addEventListener("change", restartSlider);

    function getPrevSlide() {
      prevBtn.removeEventListener("click", getPrevSlide);
      nextBtn.removeEventListener("click", getNextSlide);
      generateSlideIDs(lastSlideIDs);
      makeCards(data, currentSlideIDs, prevSlide);
      sliderCarousel.classList.add("move-left");

      sliderCarousel.addEventListener("animationend", finish);

      function finish() {
        sliderCarousel.classList.remove("move-left");
        makeCards(data, currentSlideIDs, centerSlide);
        prevBtn.addEventListener("click", getPrevSlide);
        nextBtn.addEventListener("click", getNextSlide);
        sliderCarousel.removeEventListener("animationend", finish);
      }
    }

    function getNextSlide() {
      prevBtn.removeEventListener("click", getPrevSlide);
      nextBtn.removeEventListener("click", getNextSlide);
      generateSlideIDs(lastSlideIDs);
      makeCards(data, currentSlideIDs, nextSlide);
      sliderCarousel.classList.add("move-right");

      sliderCarousel.addEventListener("animationend", finish);

      function finish() {
        sliderCarousel.classList.remove("move-right");
        makeCards(data, currentSlideIDs, centerSlide);
        nextBtn.addEventListener("click", getNextSlide);
        prevBtn.addEventListener("click", getPrevSlide);
        sliderCarousel.removeEventListener("animationend", finish);
      }
    }

    function generateSlideIDs(arr) {
      if (window.innerWidth <= 610) {
        currentSlideIDs = getCardsID(data, arr, 1);
      } else if (window.innerWidth <= 960) {
        currentSlideIDs = getCardsID(data, arr, 2);
      } else {
        currentSlideIDs = getCardsID(data, arr, 3);
      }

      lastSlideIDs = currentSlideIDs;
    }

    function restartSlider() {
      generateSlideIDs(lastSlideIDs);
      makeCards(data, currentSlideIDs, centerSlide);
      prevSlide.innerHTML = "";
      nextSlide.innerHTML = "";
    }
  });

function makeCards(data, currentSlide, targetElem) {
  let html = "";

  currentSlide.forEach((item) => {
    html += `<div class="slider__card card" data-pet-name="${data[item]["name"]}" data-pet-id="${item}">
                  <img src="${data[item]["img"]}" alt="Pet card's image" class="card__image">
                  <h3 class="card__name title-h3">${data[item]["name"]}</h3>
                  <button class="card__button primary-btn">Learn more</button>
                </div>`;
  });

  targetElem.innerHTML = html;
}

function getCardsID(arr, currentArr, value) {
  let randomValuesArr = [];
  let max = arr.length - 1;
  while (randomValuesArr.length < value) {
    let currentValue = Math.round(Math.random() * max);

    if (
      !randomValuesArr.includes(currentValue) &&
      !currentArr.includes(currentValue)
    ) {
      randomValuesArr.push(currentValue);
    }
  }

  return randomValuesArr;
}
