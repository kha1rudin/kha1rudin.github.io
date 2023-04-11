document.body.style.cursor = "none";

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

/*==================== SECTION SELECTOR ====================*/

// Get all the selector buttons and the circle
const links = document.querySelectorAll('.selector-buttons');
const circle = document.querySelector('#circle');

// Define the initial position and distance
let initialPosition = 8;
let distance = 0;

// Loop through each link and add event listeners for mouseover and mouseleave
links.forEach(link => {
  link.addEventListener('mouseover', (event) => {
    // Get the ID of the section that the link is pointing to
    const sectionId = event.target.hash.slice(1);

    // Check which section the link is pointing to
    if (sectionId === 'mechanical') {
      distance = 8;
    } else if (sectionId === 'electrical') {
      distance = 335;
    } else if (sectionId === 'pm') {
      distance = 670;
    }

    // Check if the link is already active
    if (!event.target.classList.contains('active-link')) {
      // Animate the circle to the new position
      animateCircle(distance);
    }
  });

  link.addEventListener('mouseleave', (event) => {
    // Check if the link is active
    if (event.target.classList.contains('active-link')) {
      // Reset the circle's position to the current section
      circle.style.transform = `translateX(${distance}px)`;

      // Get the ID of the section that the link is pointing to
      const sectionId = event.target.hash.slice(1);

      // Update the initial position based on the current section
      if (sectionId === 'mechanical') {
        initialPosition = 8;
      } else if (sectionId === 'electrical') {
        initialPosition = 335;
      } else if (sectionId === 'pm') {
        initialPosition = 670;
      }
    } else {
      // Animate the circle back to the initial position
      animateCircle(initialPosition);
    }
  });
});

// Add event listeners to the selector buttons for click events
const buttons = document.querySelectorAll('.selector-buttons');
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove the active-link class from the previously active button
    const currentActiveButton = document.querySelector('.selector-buttons.active-link');
    currentActiveButton.classList.remove('active-link');

    // Add the active-link class to the clicked button
    button.classList.add('active-link');
  });
});

// Animate the circle to a new position
function animateCircle(distance) {
  const keyframes = {
    transform: `translate(${distance}px)`
  };
  circle.animate(keyframes, {
    duration: 500,
    easing: 'cubic-bezier(.68,-0.55,.28,1.37)',
    fill: 'forwards'
  });
}

// Get references to the sections
const mechanicalSection = document.getElementById("mechanical");
const electricalSection = document.getElementById("electrical");
const pmSection = document.getElementById("pm");

// Get references to the selector buttons
const mechanicalButton = document.querySelector(".section-selector a[href='#mechanical']");
const electricalButton = document.querySelector(".section-selector a[href='#electrical']");
const pmButton = document.querySelector(".section-selector a[href='#pm']");

// Add event listeners to the selector buttons
if (mechanicalButton) {
  mechanicalButton.addEventListener("click", () => {
  mechanicalSection.style.display = "block";
  electricalSection.style.display = "none";
  pmSection.style.display = "none";
  });
}
if (electricalButton) {
  electricalButton.addEventListener("click", () => {
  mechanicalSection.style.display = "none";
  electricalSection.style.display = "block";
  pmSection.style.display = "none";
  });
}

if (pmButton) {
  pmButton.addEventListener("click", () => {
  mechanicalSection.style.display = "none";
  electricalSection.style.display = "none";
  pmSection.style.display = "block";
  });
}
