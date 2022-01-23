'use strict';

// Navbar transparent when it's on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

function navbarToggle() {
  navbarMenu.classList.toggle('toggled');
  blurOverlay.classList.toggle('toggled');
}
//open navbar when toggle btn is clicked in media queries
const navbarHamburgerBtn = document.querySelector('.navbar__hamburger');
const blurOverlay = document.querySelector('.blur--overlay');
navbarHamburgerBtn.addEventListener('click', () => {
  navbarToggle();
});
//deactivate navbar toggle btn & overlay when overlay is clicked
blurOverlay.addEventListener('click', () => {
  navbarToggle();
});
//deactivate navbar toggle btn & overlay when esc key is entered
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navbarMenu.classList.contains('toggled')) {
    navbarToggle();
  }
});

// make navbar menu visible on the top

// Scroll to the sction when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }
  navbarToggle();

  //navbar active menu toggle - *point: navbarMenuActive with ||(Logical OR operator)
  const navbarMenuActive =
    document.querySelector('.navbar__menu__item.active') ||
    target.classList.includes('active');
  navbarMenuActive.classList.remove('active');
  target.classList.add('active');
  scrollIntoView(link);
});

//contact me btn handling

const contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down
const homeSection = document.querySelector('.home__container');
const homeHeight = homeSection.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  homeSection.style.opacity = 1 - window.scrollY / homeHeight;
});

//show 'arrow up' btn when scrolling down

document.addEventListener('scroll', () => {
  window.scrollY > homeHeight / 2
    ? arrowUp.classList.add('visible')
    : arrowUp.classList.remove('visible');
});

//scroll to Home when arrow-up btn clicked
const arrowUp = document.querySelector('.arrow-up');
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

//project filtering
const projectBtnContainer = document.querySelector('.projects__categories');
const projectContainer = document.querySelector('.projects__box');
const projects = document.querySelectorAll('.project');

// intersectionobserver to active navbar__menu when scrolling(wheel)
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

//  1.
//Ids - string array
const sectionIds = ['#home', '#about', '#skills', '#projects', '#contact'];
// all sections in an array
const sections = sectionIds.map((id) => document.querySelector(id));
//all navitems
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

// 2. 현재 선택된 메뉴 인덱스와 메뉴 요소를 변수에 저장 , 새 메뉴 선택시 이전 클래스 리무브, 새 할당, 액티브 지정
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

//scrollIntoView function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: '0.3',
};

// intersectionObserver callback -
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      //when section not entering & ratio is more than 0 -> only to call 'home'??
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        //section scrolled down
        selectedNavIndex = index + 1;
      } else {
        // scrolled up
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// with the above index info, wheel = 0 -> home /
// window.scrollY + window.innerHeight === document.body.clientHeight => the last item
window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]); // else
});
