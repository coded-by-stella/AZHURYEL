document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".testimonial-carousel");

  if (carousel) {
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".carousel-dots");

    let currentSlide = 0;
    let autoPlay;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.remove("active", "fade-in");
        if (i === index) slide.classList.add("active", "fade-in");
      });
      updateDots();
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlay = setInterval(nextSlide, 8000);
    };

    const stopAutoPlay = () => {
      if (autoPlay) clearInterval(autoPlay);
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoPlay();
      });
    }

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);

    const buildDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";

      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
          currentSlide = i;
          showSlide(currentSlide);
          startAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    };

    const updateDots = () => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
      });
    };

    if (slides.length > 0) {
      buildDots();
      showSlide(currentSlide);
      startAutoPlay();
    }
  }

  const navbars = document.querySelectorAll(".navbar");

  navbars.forEach((navbar) => {
    const hamburger = navbar.querySelector(".hamburger");
    const navLinks = navbar.querySelector(".nav-links");
    const ctaBtn = navbar.querySelector(".cta-btn");

    if (!hamburger || !navLinks) return;

    const setExpanded = (el, state) => {
      el.setAttribute("aria-expanded", state ? "true" : "false");
    };

    setExpanded(hamburger, false);

    const openMenu = () => {
      navLinks.classList.add("active");
      setExpanded(hamburger, true);
      document.body.style.overflow = "hidden";
      if (ctaBtn) ctaBtn.style.visibility = "hidden";
    };

    const closeMenu = () => {
      navLinks.classList.remove("active");
      setExpanded(hamburger, false);
      document.body.style.overflow = "";
      if (ctaBtn) ctaBtn.style.visibility = "";
    };

    hamburger.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });
  });
});
