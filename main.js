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

// Scroll to the sction when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');

//scrollIntoView function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
}

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }
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
console.log(homeHeight);
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

projectBtnContainer.addEventListener('click', (event) => {
  const target = event.target;
  const filter = target.dataset.filter || target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //filtering animation
  projectContainer.classList.add('anim-out');
  //setTimeout to remove anim-out , for loop inside of setTimeout
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || project.dataset.type === filter) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

//all default
//make project filtering function
// how to diaplay filtered projects
