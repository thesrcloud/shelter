'use strict'

const BODY = document.querySelector('body');
const BURGER_BUTTON = document.querySelector('.header__burger-link');
const NAV = document.querySelector('.nav');
const NAV_LIST = document.querySelector('.nav__list');
const NAV_LINKS = Array.from(document.querySelectorAll('.nav__link'));
let menuStatus = 'closed';

BURGER_BUTTON.addEventListener('click', (e) => {
    e.preventDefault();
    showBurgerMenu();
})

NAV.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav') && window.innerWidth < 768) showBurgerMenu();
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeBurgerMenu();
    }
})

NAV_LIST.addEventListener('animationend', () => {
    if (menuStatus == 'closed') {
        menuStatus = 'opened';
        BURGER_BUTTON.addEventListener('click', showBurgerMenu);
        NAV_LIST.classList.add('nav__list_opened-position');
    } else {
        menuStatus = 'closed';
        BODY.classList.remove('overflow-hidden');
        NAV_LIST.classList.remove('nav__list_close');
        NAV.classList.remove('burger-menu');
        BURGER_BUTTON.classList.remove('burger-open');
        BURGER_BUTTON.classList.remove('burger-close');
        BURGER_BUTTON.addEventListener('click', showBurgerMenu);
    }
})

NAV_LINKS.forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
            e.preventDefault();
            showBurgerMenu();

            setTimeout(() => {
                location.href = item.getAttribute('href');
            }, 400)
        }
    })
})

// Open or close burger menu:
function showBurgerMenu() {
    if (menuStatus == 'closed') {
        BODY.classList.add('overflow-hidden');
        BURGER_BUTTON.classList.add('burger-open');
        NAV_LIST.classList.add('nav__list_open');
        NAV.classList.add('burger-menu');
        BURGER_BUTTON.removeEventListener("click", showBurgerMenu);
    } else if (menuStatus = 'opened') {
        BURGER_BUTTON.classList.add('burger-close');
        NAV_LIST.classList.remove('nav__list_open');
        NAV_LIST.classList.remove('nav__list_opened-position');
        NAV_LIST.classList.add('nav__list_close');
        BURGER_BUTTON.removeEventListener("click", showBurgerMenu);
    }
}

// Close burger menu:
function closeBurgerMenu() {
    menuStatus = 'closed';
    BURGER_BUTTON.classList.add('burger-close');
    NAV_LIST.classList.remove('nav__list_open');
    NAV_LIST.classList.remove('nav__list_opened-position');
    NAV_LIST.classList.add('nav__list_close');
    BODY.classList.remove('overflow-hidden');
    NAV_LIST.classList.remove('nav__list_close');
    NAV.classList.remove('burger-menu');
    BURGER_BUTTON.classList.remove('burger-open');
    BURGER_BUTTON.classList.remove('burger-close');
}
