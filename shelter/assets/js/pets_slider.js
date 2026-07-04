const sliderCarousel = document.querySelector(".b-slider__carousel");
const prevSlide = document.querySelector(".bs__prev");
const centerSlide = document.querySelector(".bs__center");
const nextSlide = document.querySelector(".bs__next");
const prevPageBtn = document.querySelector(".bs__button-prev");
const nextPageBtn = document.querySelector(".bs__button-next");
const firstPageBtn = document.querySelector(".bs__button-first");
const lastPageBtn = document.querySelector(".bs__button-last");
const currentPageBtn = document.querySelector(".bs__button-current");
const sliderBtns = document.querySelector(".b-slider__buttons");
let isMobile = window.matchMedia("(max-width: 610px)");
let isTablet = window.matchMedia("(min-width: 611px) and (max-width: 950px)");
let isDesktop = window.matchMedia("(min-width: 951px)");
let sliderIDs = generateIDs(48);
let desktopIDs = separateIDs(sliderIDs, 8);
let tabletIDs = separateIDs(sliderIDs, 6);
let mobileIDs = separateIDs(sliderIDs, 3);
let lastActivatedBtnClass = null;
let lastActivatedAnimation = null;
let isCarouselActive = false;
let currentSliderIDs;
let currentPage = 0;
let currentFirstElementID;
let activeSlide;

fetch("../../assets/json/pets.json")
  .then((response) => response.json())
  .then((result) => {
    let data = result;

    activeSlide = centerSlide;
    checkWindowResolution();
    checkBtnActivity();
    makeCards(data, currentSliderIDs[currentPage], activeSlide);
    currentFirstElementID = currentSliderIDs[currentPage][0].orderID;

    isDesktop.addEventListener("change", restartSlider);

    isTablet.addEventListener("change", restartSlider);

    isMobile.addEventListener("change", restartSlider);

    sliderBtns.addEventListener("click", (event) => {
      if (
        !isCarouselActive &&
        !event.target.classList.contains("btn-inactive") &&
        event.target.classList.contains("bs__pagination")
      ) {
        isCarouselActive = true;
        setParameters(event.target);
        checkBtnActivity();
        makeCards(data, currentSliderIDs[currentPage], activeSlide);
      }
    });

    sliderCarousel.addEventListener("animationend", () => {
      makeCards(data, currentSliderIDs[currentPage], centerSlide);
      sliderCarousel.classList.remove(lastActivatedAnimation);
      lastActivatedAnimation = null;
      isCarouselActive = false;
      activeSlide = centerSlide;
      prevSlide.innerHTML = "";
      nextSlide.innerHTML = "";
    });

    function restartSlider() {
      checkWindowResolution();
      currentPage = Math.floor(
        currentFirstElementID / currentSliderIDs[0].length,
      );
      makeCards(data, currentSliderIDs[currentPage], activeSlide);
      currentPageBtn.textContent = currentPage + 1;
      checkBtnActivity();
    }
  });

function checkWindowResolution() {
  if (isDesktop.matches) currentSliderIDs = desktopIDs;
  if (isTablet.matches) currentSliderIDs = tabletIDs;
  if (isMobile.matches) currentSliderIDs = mobileIDs;
}

function setParameters(element) {
  if (element.classList.contains("bs__button-first")) {
    currentPage = 0;
    activeSlide = prevSlide;
    currentPageBtn.textContent = currentPage + 1;
    lastActivatedBtnClass = "bs__button-first";
    lastActivatedAnimation = "bs-move-left-fast";
    sliderCarousel.classList.add(lastActivatedAnimation);
  }

  if (element.classList.contains("bs__button-prev")) {
    currentPage--;
    activeSlide = prevSlide;
    currentPageBtn.textContent = currentPage + 1;
    lastActivatedBtnClass = "bs__button-prev";
    lastActivatedAnimation = "bs-move-left";
    sliderCarousel.classList.add(lastActivatedAnimation);
  }

  if (element.classList.contains("bs__button-next")) {
    currentPage++;
    activeSlide = nextSlide;
    currentPageBtn.textContent = currentPage + 1;
    lastActivatedBtnClass = "bs__button-next";
    lastActivatedAnimation = "bs-move-right";
    sliderCarousel.classList.add(lastActivatedAnimation);
  }

  if (element.classList.contains("bs__button-last")) {
    currentPage = currentSliderIDs.length - 1;
    activeSlide = nextSlide;
    currentPageBtn.textContent = currentSliderIDs.length;
    lastActivatedBtnClass = "bs__button-last";
    lastActivatedAnimation = "bs-move-right-fast";
    sliderCarousel.classList.add(lastActivatedAnimation);
  }

  currentFirstElementID = currentSliderIDs[currentPage][0].orderID;
}

function checkBtnActivity() {
  if (currentPage == 0 || lastActivatedBtnClass == "bs__button-first") {
    firstPageBtn.classList.add("btn-inactive");
    prevPageBtn.classList.add("btn-inactive");
  }

  if (currentPage > 0) {
    firstPageBtn.classList.remove("btn-inactive");
    prevPageBtn.classList.remove("btn-inactive");
  }

  if (
    currentPage + 1 == currentSliderIDs.length ||
    lastActivatedBtnClass == "bs__button-last"
  ) {
    nextPageBtn.classList.add("btn-inactive");
    lastPageBtn.classList.add("btn-inactive");
  }

  if (currentPage + 1 != currentSliderIDs.length) {
    nextPageBtn.classList.remove("btn-inactive");
    lastPageBtn.classList.remove("btn-inactive");
  }
}

function makeCards(data, currentSlide, targetElem) {
  let html = "";

  currentSlide.forEach((item) => {
    item = item.id;
    html += `<div class="slider__card card" data-pet-name="${data[item]["name"]}" data-pet-id="${item}">
                  <img src="${data[item]["img"]}" alt="Pet card's image" class="card__image">
                  <h3 class="card__name title-h3">${data[item]["name"]}</h3>
                  <button class="card__button primary-btn">Learn more</button>
                </div>`;
  });

  targetElem.innerHTML = html;
}

function generateIDs(value) {
  let fullRandom = [];
  let repeatedValues = [];
  let lastFour = [];
  let currentOrder = [];
  while (fullRandom.length < 8) {
    let random = Math.round(Math.random() * 7);
    if (!fullRandom.includes(random)) {
      fullRandom.push(random);
    }
  }
  if (fullRandom.length == 8) lastFour = fullRandom.slice(-4);
  while (fullRandom.length != value) {
    let random = Math.round(Math.random() * 7);
    if (countNum(fullRandom, random) == 6) repeatedValues.push(random);
    if (
      !lastFour.includes(random) &&
      !currentOrder.includes(random) &&
      !repeatedValues.includes(random)
    ) {
      currentOrder.push(random);
    }
    if (currentOrder.length == 4) {
      fullRandom = fullRandom.concat(currentOrder);
      currentOrder = [];
      lastFour = fullRandom.slice(-4);
    }
  }
  function countNum(arr, num) {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == num) counter++;
    }
    return counter;
  }
  return fullRandom;
}

function separateIDs(arr, length) {
  let separated = [];
  let currentOrder = [];
  for (let i = 0; i < arr.length; i++) {
    currentOrder.push({ id: arr[i], orderID: i });
    if (currentOrder.length == length) {
      separated.push(currentOrder);
      currentOrder = [];
    }
  }

  return separated;
}
