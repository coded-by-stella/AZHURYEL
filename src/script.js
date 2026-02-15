// src/script.js

(function () {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav (supports data-hamburger + data-nav)
  const hamburger = document.querySelector("[data-hamburger]");
  const nav = document.querySelector("[data-nav]");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      nav.classList.toggle("open");
    });

    // Close menu when clicking a link
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A") {
        nav.classList.remove("active");
        nav.classList.remove("open");
      }
    });

    // Close menu on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        nav.classList.remove("active");
        nav.classList.remove("open");
      }
    });
  }

  // Testimonials carousel (optional)
  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const slides = carousel.querySelectorAll(".testimonial-slide");
    const prevBtn = carousel.querySelector("[data-prev]");
    const nextBtn = carousel.querySelector("[data-next]");
    const dotsWrap = carousel.querySelector("[data-dots]");
    const dots = dotsWrap
      ? dotsWrap.querySelectorAll(".dot, .carousel-dot")
      : [];

    let index = 0;

    const setActive = (newIndex) => {
      slides.forEach((s) => s.classList.remove("active", "fade-in"));
      dots.forEach((d) => d.classList.remove("active"));

      index = (newIndex + slides.length) % slides.length;

      slides[index].classList.add("active", "fade-in");
      if (dots[index]) dots[index].classList.add("active");
    };

    if (prevBtn) prevBtn.addEventListener("click", () => setActive(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => setActive(index + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => setActive(i));
    });
  }
})();
