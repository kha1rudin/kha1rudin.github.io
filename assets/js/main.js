document.body.style.cursor = "none";

const loader = document.querySelector('.loading-page-container');

window.addEventListener('load', () => {
  disableScroll();
  loader.style.display = `flex`;
  setTimeout(() => {
    document.querySelector('body').classList.remove('hidden');
    loader.style.display = `none`;
    enableScroll();
  }, 3000);
});

/*==================== MOUSE TRAILER ====================*/
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;
  
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 2.2 : 0.5})`
  }

  trailer.animate(keyframes, { 
    duration: 400, 
    fill: "forwards" 
  });
}

window.onmousemove = e => {
  const nav_link = e.target.closest(".nav-btns, .nav-link, .nav-contact, .about-buttons, .swiper-slide, .contact-buttons, .footer-social"),
        interacting = nav_link !== null;

  animateTrailer(e, interacting);
}

/*==================== GLOW EFFECT ====================*/
const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 6000, fill: "forwards" });
}

/*==================== HACKED TEXT EFFECT ====================*/
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector(".nav-contact").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

/*==================== NAV BAR ====================*/
let val = 0;
let blurs = 0;
let timeoutId = 0;

let prevScrollPos = window.pageYOffset;
const header = document.querySelector('.header');
const navbar = document.querySelector('.nav-bar');

window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // User is scrolling up
    toggleHeader(0),
    fadeBlur(18);
  } else {
    // User is scrolling down
    toggleHeader(-100),
    fadeBlur(0);
  }
  if (currentScrollPos === 0) {
    fadeBlur(0);
  }
  prevScrollPos = currentScrollPos;

  // Clear the timeout if it has already been set
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Set a timeout to check for scroll inactivity after 500ms
  timeoutId = setTimeout(function() {
    // Your code to run after 3s of scroll inactivity
    if (currentScrollPos != 0) {
      toggleHeader(-100);
    }
  }, 3000);
}

function toggleHeader(val) {
  const keyframes = {
    transform: `translateY(${val}px)`,
  };
  header.animate(keyframes, {
    duration: 800,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
}

function fadeBlur(blurs) {
  const keyframes = {
    backdropFilter: `blur(${blurs}vmax)`
  };
  navbar.animate(keyframes, {
    duration: 600,
    easing: 'cubic-bezier(.84,.28,.61,.87)',
    fill: 'forwards'
  });
}

/*==================== NAV BUTTON ====================*/
const navToggle = document.getElementById("nav-toggle");
const navButton = document.getElementById("nav-button");
const navMenu = document.querySelector('.nav-menu');
const menuLinkHome = document.querySelector('.menu-link.home');
const menuLinkAbout = document.querySelector('.menu-link.about');
const menuLinkProjects = document.querySelector('.menu-link.projects');
const menuLinkContact = document.querySelector('.menu-link.contact');

let v = 0;

navToggle.addEventListener("click", function() {
  if (navButton.classList.contains("uil-bars")) {
    navButton.classList.remove("uil-bars");
    navButton.classList.add("uil-multiply");
    showMenu(0);
    disableScroll();
  } else {
    navButton.classList.remove("uil-multiply");
    navButton.classList.add("uil-bars");
    showMenu(-100);
    enableScroll();
  }
});

menuLinkHome.addEventListener("click", function() {
  navButton.classList.remove("uil-multiply");
  navButton.classList.add("uil-bars");
  showMenu(-100);
  enableScroll();
  menuLinkHome.setAttribute("href", "#home");
})

menuLinkAbout.addEventListener("click", function() {
  navButton.classList.remove("uil-multiply");
  navButton.classList.add("uil-bars");
  showMenu(-100);
  enableScroll();
  menuLinkAbout.setAttribute("href", "#about");
})

menuLinkProjects.addEventListener("click", function() {
  navButton.classList.remove("uil-multiply");
  navButton.classList.add("uil-bars");
  showMenu(-100);
  enableScroll();
  menuLinkProjects.setAttribute("href", "#projects");
})

menuLinkContact.addEventListener("click", function() {
  navButton.classList.remove("uil-multiply");
  navButton.classList.add("uil-bars");
  showMenu(-100);
  enableScroll();
  animateCards(first_card, 0);
  animateCards(second_card, 0);
  animateCards(third_card, 0);
  animateCards(forth_card, 0);
  animateCards(fifth_card, 0);
  menuLinkContact.setAttribute("href", "#contact");
})

// Show navigation menu
function showMenu(v) {
  const keyframes = {
    top: `${v}%`
  };
  navMenu.animate(keyframes, {
    duration: 500,
    easing: 'cubic-bezier(.22,.8,.36,.95)',
    fill: 'forwards'
  });
}

// Disable scrolling
function disableScroll() {
  // Set the overflow style property
  document.body.style.overflow = 'hidden';
  // Scroll to top of the page
  window.scrollTo(0, 0);
}

// Enable scrolling
function enableScroll() {
  // Restore the overflow style property
  document.body.style.overflow = '';
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const div = document.querySelectorAll('div[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    div.forEach(current =>{
        const divHeight = current.offsetHeight
        const divTop = current.offsetTop - 50;
        divId = current.getAttribute('id')

        const navLink = document.querySelector('.nav-link-section a[href*=' + divId + ']');
        if(navLink){
            if(scrollY > divTop && scrollY <= divTop + divHeight){
                document.querySelector('.nav-link-section a[href*=' + divId + ']').classList.add('active-link')
            }else{
                document.querySelector('.nav-link-section a[href*=' + divId + ']').classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CARD SHUFFLER ====================*/
const first_card = document.querySelector('.first-card');
const second_card = document.querySelector('.second-card');
const third_card = document.querySelector('.third-card');
const forth_card = document.querySelector('.forth-card');
const fifth_card = document.querySelector('.fifth-card');

const triggerPoint0 = 350;
const triggerPoint1 = 500;
const triggerPoint2 = 800;
const triggerPoint3 = 1000;
const triggerPoint4 = 1200;

const triggerPoint5 = 1200;
const triggerPoint6 = 1350;
const triggerPoint7 = 1500;
const triggerPoint8 = 1650;
const triggerPoint9 = 1900;

let card = 0;
let value = 0;

function animateOnScroll() {

  if (window.matchMedia("(min-width:1250px)").matches) {
    // Code to be executed on smaller devices
    // For example, you could hide certain elements or change their behavior
    if (window.scrollY > triggerPoint0) {
      animateCards(first_card, 0);
    } else {
      animateCards(first_card, -15);
    }
    if (window.scrollY > triggerPoint1) {
      animateCards(second_card, 0);
    } else {
      animateCards(second_card, -21.5);
    }
    if (window.scrollY > triggerPoint2) {
      animateCards(third_card, 0);
    } else {
      animateCards(third_card, -43);
    }
  
    if (window.scrollY > triggerPoint3) {
      animateCards(forth_card, 0);
    } else {
      animateCards(forth_card, -64.5);
    }
  
    if (window.scrollY > triggerPoint4) {
      animateCards(fifth_card, 0);
    } else {
      animateCards(fifth_card, -85.5);
    }
  } else {
    // Code to be executed on larger devices
    // For example, you could show certain elements or change their behavior
    if (window.scrollY > triggerPoint5) {
      animateCards(first_card, 0);
    } else {
      animateCards(first_card, -15);
    }
    if (window.scrollY > triggerPoint6) {
      animateCards(second_card, 0);
    } else {
      animateCards(second_card, -21.5);
    }
    if (window.scrollY > triggerPoint7) {
      animateCards(third_card, 0)
    } else {
      animateCards(third_card, -43);
    }
  
    if (window.scrollY > triggerPoint8) {
      animateCards(forth_card, 0);
    } else {
      animateCards(forth_card, -64.5);
    }
  
    if (window.scrollY > triggerPoint9) {
      animateCards(fifth_card, 0);
    } else {
      animateCards(fifth_card, -85.5);
    }
  }
}

function animateCards(card, value) {
  const keyframes = {
    left: `${value}%`
  };
  card.animate(keyframes, {
    duration: 900,
    easing: 'cubic-bezier(.79,.86,.76,1.24)',
    fill: 'forwards'
  });
}

window.addEventListener('wheel', animateOnScroll);
