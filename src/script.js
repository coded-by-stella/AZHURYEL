// --- Testimonial Carousel ---
const slides = document.querySelectorAll(".testimonial-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;
let autoPlay;

// Show slide by index
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "fade-in");
    if (i === index) {
      slide.classList.add("active", "fade-in");
    }
  });
}

// Next and previous slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlideFunc() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Autoplay control
function startAutoPlay() {
  autoPlay = setInterval(nextSlide, 8000);
}
function stopAutoPlay() {
  clearInterval(autoPlay);
}

prevBtn.addEventListener("click", prevSlideFunc);
nextBtn.addEventListener("click", nextSlide);
document.querySelector(".testimonial-carousel").addEventListener("mouseenter", stopAutoPlay);
document.querySelector(".testimonial-carousel").addEventListener("mouseleave", startAutoPlay);

showSlide(currentSlide);
startAutoPlay();

// --- Dots for carousel ---
const dotsContainer = document.querySelector(".carousel-dots");

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
    resetAutoPlay();
  });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "fade-in");
    if (i === index) slide.classList.add("active", "fade-in");
  });
  updateDots();
}

updateDots();

/* Mobile menu toggle */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", String(open));
  });
}


