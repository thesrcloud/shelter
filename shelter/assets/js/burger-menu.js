"use strict";

const body = document.querySelector("body");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav__list");
const burgerBtn = document.querySelector(".burger-btn");
let isOpened = false;
let isActive = false;
let linkAddress = null;

function checkResolution() {
  return window.innerWidth;
}

function openMenu() {
  burgerBtn.removeEventListener("click", getMenuEvent);
  body.classList.add("overflow-dis");
  nav.classList.add("d-flex");
  navList.classList.add("open-menu");
  burgerBtn.classList.add("burger-btn--active");
  isActive = true;

  navList.addEventListener("animationend", finishOpen);

  function finishOpen() {
    navList.classList.remove("open-menu");
    isOpened = true;
    isActive = false;
    burgerBtn.addEventListener("click", getMenuEvent);
    navList.removeEventListener("animationend", finishOpen);
  }
}

function closeMenu() {
  navList.classList.add("close-menu");
  burgerBtn.removeEventListener("click", getMenuEvent);
  burgerBtn.classList.remove("burger-btn--active");
  isActive = true;

  navList.addEventListener("animationend", finishClose);

  function finishClose() {
    body.classList.remove("overflow-dis");
    nav.classList.remove("d-flex");
    navList.classList.remove("close-menu");
    isOpened = false;
    isActive = false;
    burgerBtn.addEventListener("click", getMenuEvent);
    navList.removeEventListener("animationend", finishClose);

    if (linkAddress) {
      console.log(linkAddress);
      location.href = linkAddress;
      linkAddress = null;
    }
  }
}

function getMenuEvent() {
  if (checkResolution() <= 767 && !isOpened) {
    openMenu();
  } else if (checkResolution() <= 767 && isOpened) {
    closeMenu();
  }
}

function resetMenu() {
  isOpened = false;
  burgerBtn.classList.remove("burger-btn--active");
  body.classList.remove("overflow-dis");
  nav.classList.remove("d-flex");
}

burgerBtn.addEventListener("click", getMenuEvent);

window.addEventListener("resize", () => {
  if (checkResolution() > 767 && isOpened) {
    resetMenu();
  }
});

window.addEventListener("click", (e) => {
  if (isOpened && !isActive && e.target.classList.contains("nav")) {
    closeMenu();
  }
});

Array.from(document.querySelectorAll(".nav__link")).forEach((link) => {
  link.addEventListener("click", (e) => {
    if (isOpened) {
      e.preventDefault();
      linkAddress = link.href;
      closeMenu();
    }
  });
});
