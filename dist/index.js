// Navbar Section
const menu = document.getElementById("menu");
const hamburger = document.getElementById("hamburger");
const hamburgerIcon = document.getElementById("hamburger-icon");

let isMenuOpen = false; // Track menu state

hamburger.addEventListener("click", function () {
  isMenuOpen = !isMenuOpen; // Toggle state

  if (isMenuOpen) {
    hamburgerIcon.classList.remove("fa-burger");
    hamburgerIcon.classList.add("fa-times"); // Change to cross icon
    menu.classList.remove("hidden"); // Show menu
  } else {
    hamburgerIcon.classList.remove("fa-times");
    hamburgerIcon.classList.add("fa-burger"); // Change back to hamburger icon
    menu.classList.add("hidden"); // Hide menu
  }
});

// Dark / Light mode

function toggleIcons() {
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");
  const body = document.body;

  if (sunIcon.classList.contains("hidden")) {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
  body.classList.toggle("dark");
  updateDescription(currentProjectId);
}

// Home Section

const secText = document.querySelector(".sec-text");

const textArray = [
  "Susmita Nayak.",
  "a Frontend Developer.",
  "a Web Designer.",
  "a UI/UX Designer.",
];

let currentIndex = 0;
let charIndex = 0;
let isErasing = false;
const typingSpeed = 100; // Speed for typing each character (ms)
const erasingSpeed = 50; // Speed for erasing each character (ms)
const pauseBetween = 2000; // Pause time between phrases (ms)

function typeEffect() {
  const currentText = textArray[currentIndex];

  if (!isErasing) {
    // Typing forward
    if (charIndex < currentText.length) {
      secText.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, typingSpeed);
    } else {
      // Pause before erasing
      isErasing = true;
      setTimeout(typeEffect, pauseBetween);
    }
  } else {
    // Erasing backward
    if (charIndex > 0) {
      secText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, erasingSpeed);
    } else {
      // Move to the next text
      isErasing = false;
      currentIndex = (currentIndex + 1) % textArray.length; // Loop back to the first text
      setTimeout(typeEffect, typingSpeed);
    }
  }
}

// Start the typing and erasing effect
typeEffect();

// Project Section

window.addEventListener("scroll", function () {
  const sections = document.getElementsByClassName("animated-section");

  Array.from(sections).forEach((section) => {
    const sectionPosition = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (sectionPosition < screenPosition) {
      const divs = section.querySelectorAll("div");
      divs.forEach((div, index) => {
        setTimeout(() => {
          div.classList.remove("opacity-0", "translate-y-[-25%]");
          div.classList.add("opacity-100", "translate-y-0");
        }, index * 100);
      });
    }
  });
});

const descriptions = [
  {
    id: 0,
    title: "Chat WebApp",
    description:
      "A chat web app that fetches and displays user-AI conversations via APIs. Allows users to view and switch between past chat sessions, providing a smooth experience with optimized layouts for both mobile and desktop devices.",
    techStack: ["React Js", "TypeScript", "Tailwind CSS", "RESTful APIs"],
  },
  {
    id: 1,
    title: "Weather",
    description:
      "A weather web app that provides real-time weather updates for localities across India. It integrates an external API for accurate forecasts and features a modern, responsive design, ensuring a seamless user experience.",
    techStack: ["Next JS", "TypeScript", "Tailwind CSS", "RESTful APIs"],
  },
  {
    id: 2,
    title: "Sellerapp",
    description:
      "An Analytic web application for visualizing key business metrics like total income, profit, views, and conversion rates. It features dynamic light/dark mode support, interactive data visualization, and a user-friendly dashboard layout for data-driven insights",
    techStack: ["React Js", "Tailwind CSS", "Static JSON"],
  },
  {
    id: 3,
    title: "BingeVerse",
    description:
      "A responsive movie streaming platform template with a modern design, featuring a multi-page layout that includes an engaging landing page, interactive carousels, and a sign-in interface, showcasing UI design and frontend development skills.",
    techStack: ["Bootstrap", "JavaScript"],
  },
];

// Initialize current project ID
let currentProjectId = 0;

// Get references to DOM elements
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const techStackContainer = document.getElementById("techStackContainer");

// Function to update the description based on the current project ID
function updateDescription(id) {
  // Check if the id is valid
  if (id < 0 || id >= descriptions.length) return;

  const project = descriptions[id];
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;

  techStackContainer.innerHTML = "";

  const isDarkMode = document.body.classList.contains("dark-mode");

  project.techStack.forEach((tech) => {
    const techItem = document.createElement("div");
    techItem.classList.add("rounded-full", "mx-1", "my-2", "px-4", "py-2");

    // Change the background color based on dark mode
    if (isDarkMode) {
      techItem.classList.add("bg-[#ffa2b3]");
    } else {
      techItem.classList.add("bg-[#d9b4fe]");
    }

    techItem.textContent = tech;
    techStackContainer.appendChild(techItem);
  });
}

// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  effect: "cube",
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Listen for slide changes to update the description
  on: {
    slideChange: function () {
      // Get the current active slide
      const activeSlide = this.slides[this.activeIndex];
      // Retrieve the ID from the data-id attribute
      const id = parseInt(activeSlide.getAttribute("data-id"));
      currentProjectId = id; // Set the current project ID
      updateDescription(currentProjectId); // Update the description based on the new ID
    },
  },
});

// Update description initially
updateDescription(currentProjectId);

// Animation for the first project when scrolling
window.addEventListener("scroll", function () {
  const section = document.getElementById("animated-descp");
  const sectionPosition = section.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.2;

  // Apply animation only for the first project
  if (currentProjectId === 0 && sectionPosition < screenPosition) {
    section.classList.remove("opacity-0", "-translate-x-[15%]");
    section.classList.add("opacity-100", "translate-x-0");
  }
});

// Contact Section

async function handleSubmit(event) {
  event.preventDefault(); // Prevent form submission from redirecting

  // Validate inputs before sending
  if (!checkInputs()) {
    return; // Stop submission if validation fails
  }

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      document.getElementById("responseMessage").textContent =
        "Your message has been sent successfully!";
      form.reset(); // Optionally reset the form after successful submission
    } else {
      document.getElementById("responseMessage").textContent =
        "There was an issue with your submission, please try again.";
    }
  } catch (error) {
    document.getElementById("responseMessage").textContent =
      "An error occurred, please try again later.";
  }
}

function checkInputs() {
  let isValid = true; // Flag for form validation

  // Get form input values
  const name = document.getElementById("name").value.trim();
  const nameBox = document.getElementById("nameContainer");
  const nameError = document.getElementById("nameError");
  const email = document.getElementById("email").value.trim();
  const emailBox = document.getElementById("emailContainer");
  const emailError = document.getElementById("emailError");
  const message = document.getElementById("message").value.trim();
  const messageBox = document.getElementById("messageContainer");
  const messageError = document.getElementById("messageError");

  // Clear previous error messages
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // Validate name
  if (name === "") {
    nameError.textContent = "Please enter your name.";
    toggleError(nameBox, true);
    isValid = false;
  } else {
    toggleError(nameBox, false); // Remove margin if no error
  }

  // Validate email
  if (email === "") {
    emailError.textContent = "Please enter your email.";
    toggleError(emailBox, true);
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    toggleError(emailBox, true);
    isValid = false;
  }

  if (message === "") {
    messageError.textContent = "Please enter your message.";
    toggleError(messageBox, true);
    isValid = false;
  } else {
    toggleError(messageBox, false); // Remove margin if no error
  }

  return isValid; // Only proceed with form submission if valid
}

function toggleError(fieldContainer, hasError) {
  if (hasError) {
    // Add margin when error exists
    fieldContainer.classList.remove("mb-5");
    fieldContainer.classList.add("mb-0");
  } else {
    // Remove margin when no error
    fieldContainer.classList.remove("mb-0");
    fieldContainer.classList.add("mb-5");
  }
}

// Helper function to validate email using regex
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute("data-target");
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const offset = 73; // Adjust to your desired padding
    const elementPosition = targetElement.offsetTop;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

document.addEventListener("mousemove", (event) => {
  const eyes = document.querySelectorAll(".eye");
  const { clientX: mouseX, clientY: mouseY } = event;

  eyes.forEach((eye) => {
    const { left, top, width, height } = eye.getBoundingClientRect();
    const eyeCenterX = left + width / 2;
    const eyeCenterY = top + height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    const pupil = eye.querySelector(".pupil");
    const maxOffset = (width / 2 - pupil.offsetWidth / 2) * 0.6; // Adjust for pupil size
    const x = Math.cos(angle) * maxOffset;
    const y = Math.sin(angle) * maxOffset;

    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});
