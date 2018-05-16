// Navigation
const mobileNavClose = document.querySelector('.header__mobile-close'),
    mobileButton = document.querySelector('.header__mobile-button'),
    header = document.querySelector('.header__mobile'),
    headerNavButton = document.querySelector('.header__nav-trigger'),
    headerDropdown = document.querySelector('.header__dropdown'),
    headerSearch = document.querySelector('.header__search'),
    mobileNavItem = document.querySelectorAll('.header__mobile-nav-item'),
    mobileNavBack = document.querySelectorAll('.header__mobile-back'),
    mobileNavMain = document.querySelector('.header__mobile-nav-main'),
    mobileNavScroll = document.querySelector('.header__mobile-scroll'),
    mobileSubnav = document.querySelectorAll('.header__mobile-subnav-column'),
    mobileSubnavArr = Array.from(mobileSubnav),
    allMobileElements = [mobileNavClose, mobileButton, header, headerSearch];

if (header) {
    headerNavButton.addEventListener('click', () => {
        if (headerNavButton.classList.contains('header__nav-trigger_active')) {
            mainNavClose();
        } else {
            mainNavOpen();
        }
    });
    
    mobileNavClose.addEventListener('click', () => {
        navClose();
    });
    
    mobileButton.addEventListener('click', () => {
        if (mobileButton.classList.contains('active')) {
            navClose();
        } else {
            navOpen();
        }
    });
    
    Array.from(mobileNavItem).forEach((item, i) => {
        item.addEventListener('click', () => {
            mobileSubnavArr.forEach((sub) => {
               sub.classList.remove('active');
            });
            mobileNavMain.style.display = 'none';
            mobileSubnavArr[i].classList.add('active');
    
            navScrollToTop();
        });
    });
    
    Array.from(mobileNavBack).forEach((item) => {
        item.addEventListener('click', () => {
            navDefaultState();
            navScrollToTop();
        });
    });
    
}

export function mainNavClose() {
    headerNavButton.classList.remove('header__nav-trigger_active');
    headerDropdown.classList.remove('header__dropdown_active');
}

export function mainNavOpen() {
    headerNavButton.classList.add('header__nav-trigger_active');
    headerDropdown.classList.add('header__dropdown_active');
}

export function navClose() {
    allMobileElements.forEach((element) => {
        element.classList.remove('active');
    });
    navDefaultState();
    navScrollToTop();
}

export function navDefaultState() {
    mobileSubnavArr.forEach((sub) => {
        sub.classList.remove('active');
    });
    mobileNavMain.style.display = 'block';
    Array.from(document.querySelectorAll('.header__mobile-subnav-trigger')).forEach((el) => {
        el.classList.remove('active');
    });
    Array.from(document.querySelectorAll('.header__mobile-subnav-content')).forEach((el) => {
        el.classList.remove('active');
    });
    navScrollToTop();
}

export function navScrollToTop() {
    mobileNavScroll.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    });
}

export function navOpen() {
    allMobileElements.forEach((element) => {
        element.classList.add('active');
    });
}