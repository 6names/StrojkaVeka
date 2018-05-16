import "babel-polyfill";
import './components/icons';
import {browsers} from "./components/browser-detect";
import {navClose, navOpen, mainNavClose, mainNavOpen} from "./components/header";
import {modalHolder, getModal, removeModal} from "./components/modals";
import {accordion, dropDown} from "./components/accordions";
import {validateEmail, validateName, validatePhone} from "./components/validation";
import {tns} from "../../node_modules/tiny-slider/src/tiny-slider.module.js";

// Get Modal
const modalTriggers = document.querySelectorAll('.modal-trigger');
Array.from(modalTriggers).forEach(trigger => {
    trigger.addEventListener('click', e => {
        getModal(`modals/${e.target.getAttribute('data-target')}.html`, function () {
            // Init plugins inside modal
            initFunc();
        });
        
        navClose();
        e.preventDefault();
    });
});

// Remove modal
if (modalHolder) {
    modalHolder.addEventListener('click', e => {
        if (e.target.classList.contains('modal__close')) {
            removeModal();
            e.preventDefault();
        }
    });
}

// Modal inner functions
function initFunc() {
    // Order form validation
    const orderForm = document.getElementById('order-form');
    const orderName = document.getElementById('order-name');
    const orderEmail = document.getElementById('order-email');
    const orderPhone = document.getElementById('order-phone');
    
    if (orderForm) {
        orderName.addEventListener('blur', () => {
            validateName(orderName);
        });
        orderEmail.addEventListener('blur', () => {
            validateEmail(orderEmail);
        });
        orderPhone.addEventListener('blur', () => {
            validatePhone(orderPhone);
        });
        orderForm.addEventListener('submit', (e) => {
            validateEmail(orderName);
            validateName(orderEmail);
            validatePhone(orderPhone);
            
            if (validateName(orderName) !== true || validateEmail(orderEmail) !== true || validatePhone(orderPhone) !== true) {
                e.preventDefault();
            } else {
                // Your submit function
            }
        });
    }
}

// Header search
const searchInput = document.querySelectorAll('.search__input');
Array.from(searchInput).forEach(function (input) {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('search_active');
    });
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('search_active');
    });
});

// Header categories
dropDown(document.body, '.header__categories-value', '.header__categories-list');
dropDown(document.body, '.header__mobile-categories-value', '.header__mobile-categories-list');
dropDown(document.body, '.header__contacts-location-trigger', '.header__contacts-location-list');
dropDown(document.body, '.header__mobile-location-trigger', '.header__mobile-location-list');

// Close all temporary dropdowns by clicking on document
const main = document.querySelector('.main');
main.addEventListener('click', () => {
    mainNavClose();
});

document.addEventListener('click', e => closeHandler(e));
document.addEventListener('touchend', e => closeHandler(e));

function closeHandler(e) {
    if (!e.target.classList.contains('header__categories-value')) {
        closeCategories();
    }
    if (!e.target.classList.contains('header__mobile-categories-value')) {
        closeCategoriesMobile();
    }
    if (!e.target.classList.contains('header__contacts-location-trigger')) {
        closeLocation();
    }
    if (!e.target.classList.contains('header__mobile-location-trigger')) {
        closeLocationMobile();
    }
}

function closeCategories() {
    document.querySelector('.header__categories-value').classList.remove('active');
    document.querySelector('.header__categories-list').classList.remove('active');
}

function closeCategoriesMobile() {
    document.querySelector('.header__mobile-categories-value').classList.remove('active');
    document.querySelector('.header__mobile-categories-list').classList.remove('active');
}

function closeLocation() {
    document.querySelector('.header__contacts-location-trigger').classList.remove('active');
    document.querySelector('.header__contacts-location-list').classList.remove('active');
}

function closeLocationMobile() {
    document.querySelector('.header__mobile-location-trigger').classList.remove('active');
    document.querySelector('.header__mobile-location-list').classList.remove('active');
}

// Mobile header
dropDown(document.body, '.header__mobile-subnav-trigger', '.header__mobile-subnav-content');

// Slider
let productSlider;
const productSliderCounter = document.querySelector('.product__header-slider-counter');
const productSliderNext = document.querySelector('.product__header-slider-next');
const productSliderPrev = document.querySelector('.product__header-slider-prev');

if (productSliderCounter) {
    
    productSlider = tns({
        container: '.product__header-gallery',
        slideBy: 'page',
        autoplay: false,
        nav: false,
        loop: false,
        controlsContainer: ".product__header-slider-controls",
    });
    
    productSliderCounter.innerHTML = `${productSlider.getInfo().index + 1}/${productSlider.getInfo().slideCount}`;
    
    productSliderNext.addEventListener('click', () => {
        productSliderCounter.innerHTML = `${productSlider.getInfo().index + 2}/${productSlider.getInfo().slideCount}`;
    });
    productSliderPrev.addEventListener('click', () => {
        productSliderCounter.innerHTML = `${productSlider.getInfo().index}/${productSlider.getInfo().slideCount}`;
    });
}


// Window Resize
window.addEventListener('resize', () => {
    windowResize();
});

function windowResize() {
    if (window.innerWidth <= 1024) {
        mainNavClose();
    } else {
        navClose();
        productSlideHeight();
    }
}

// Product slide height
const productData = document.querySelector('.product__header-data');
const productSlide = document.querySelectorAll('.product__header-slide');

function productSlideHeight() {
    if (productData) {
        Array.from(productSlide).forEach(slide => {
            slide.style.height = `${productData.clientHeight}px`;
        });
    }
}

// Anchors
const anchors = document.querySelectorAll('a.anchor');
const anchorsArr = Array.from(anchors);
const scrollBlocks = document.querySelectorAll('.scroll-block');
const scrollBlocksArr = Array.from(scrollBlocks);

if (anchors) {
    anchorsArr.forEach(anchor => {
        anchor.addEventListener('click', e => {
            const link = anchor.getAttribute('href');
            const destination = document.querySelector(link);
            
            window.scroll({
                behavior: 'smooth',
                left: 0,
                top: destination.offsetTop
            });
            
            e.preventDefault();
        });
    });
}

function currentScroll() {
    scrollBlocksArr.forEach(block => {
        const id = block.getAttribute('id');
        if (window.scrollY >= block.offsetTop && window.scrollY <= (block.clientHeight + block.offsetTop)) {
            anchorsArr.forEach((anchor) => {
                const link = anchor.getAttribute('href');
                
                if (link === `#${id}`) {
                    anchor.classList.add('current');
                } else {
                    anchor.classList.remove('current');
                }
            });
        }
    });
}

const pageNav = document.querySelector('.page-nav');

function fixedNav() {
    const navHolder = document.querySelector('.page-nav__holder');
    let rect = pageNav.getBoundingClientRect();
    
    if (rect.top <= 0) {
        navHolder.classList.add('page-nav__holder_fixed');
    } else {
        navHolder.classList.remove('page-nav__holder_fixed');
    }
}

window.addEventListener('scroll', () => {
    if (scrollBlocks) {
        currentScroll();
    }
    
    if (pageNav) {
        fixedNav();
    }
});

// Check if content loaded
document.addEventListener('DOMContentLoaded', () => {
    const pageHtml = document.querySelector('html');
    pageHtml.classList.add('loaded');
    
    // Browser And Platform Detect
    browsers();
    
    // Fixed page navigation
    if (scrollBlocks) {
        currentScroll();
    }
    if (pageNav) {
        fixedNav();
    }
    
    // Product slide height
    setTimeout(() => {
        productSlideHeight();
    }, 1000);
});





