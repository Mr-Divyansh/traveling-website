/* =====================================================
   Himachal Pradesh Tourism - Main Script
   ===================================================== */

// The face name of the founder / agency representative
window.__FACE_NAME = "Rajesh Sharma";

document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------------------------------
     1. Hamburger Menu Toggle
     ------------------------------------------------- */
  var menuToggler = document.getElementById("menu-toggler");
  var hamburgerBtn = document.getElementById("hamburger-btn");
  var allLinks = document.querySelector(".all-links");

  if (hamburgerBtn && menuToggler) {
    hamburgerBtn.addEventListener("click", function () {
      // Toggle the hidden checkbox so the CSS :checked rule opens the menu
      menuToggler.checked = !menuToggler.checked;
    });
  }

  // Close the mobile menu after a link is clicked
  if (allLinks && menuToggler) {
    allLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggler.checked = false;
      });
    });
  }

  /* -------------------------------------------------
     2. Contact Form Validation & Submission
     ------------------------------------------------- */
  var contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // Prevent the default page reload so we can show feedback
      event.preventDefault();

      var nameInput = contactForm.querySelector('input[type="text"]');
      var emailInput = contactForm.querySelector('input[type="email"]');
      var messageInput = contactForm.querySelector("textarea");

      var name = nameInput ? nameInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      var message = messageInput ? messageInput.value.trim() : "";

      // Basic validation
      if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields before sending your message.");
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // "Submit" the form — show a success message with the face name
      alert(
        "Thank you, " +
          name +
          "! Your message has been sent successfully.\n\n" +
          window.__FACE_NAME +
          " (Founder & CEO, Himachal Pradesh Tourism) and our team will get back to you within 24 hours."
      );

      // Reset the form after successful submission
      contactForm.reset();
    });
  }

  /* -------------------------------------------------
     3. Display Face Name Dynamically
     ------------------------------------------------- */
  var faceNameElements = document.querySelectorAll(".face-name");
  faceNameElements.forEach(function (el) {
    if (!el.textContent.includes(window.__FACE_NAME)) {
      el.textContent = el.textContent.replace(
        /\b[A-Z][a-z]+ [A-Z][a-z]+\b/,
        window.__FACE_NAME
      );
    }
  });

  /* -------------------------------------------------
     4. Animated Stat Counters
     ------------------------------------------------- */
  // Signal to CSS that JS is available (enables reveal animations)
  document.documentElement.classList.add("js");

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out for a nicer feel
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString("en-IN") + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString("en-IN") + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  var statNumbers = document.querySelectorAll(".stat-number");
  if ("IntersectionObserver" in window && statNumbers.length > 0) {
    var counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach(function (num) {
      counterObserver.observe(num);
    });
  } else {
    // Fallback: just show final values
    statNumbers.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-target"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      el.textContent = target.toLocaleString("en-IN") + suffix;
    });
  }

  /* -------------------------------------------------
     5. Scroll Reveal Animations
     ------------------------------------------------- */
  var revealElements = document.querySelectorAll(
    ".stat-item, .testimonial-card, .faq-item"
  );
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* -------------------------------------------------
     6. Back to Top Button
     ------------------------------------------------- */
  var backToTop = document.getElementById("back-to-top");

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------------------------------
     7. Active Nav Link on Scroll
     ------------------------------------------------- */
  var navLinks = document.querySelectorAll(".all-links a");
  var sectionsById = {};
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(function (link) {
    var href = link.getAttribute("href") || "";
    var hashIndex = href.indexOf("#");
    var base = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    var id = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";

    // Highlight the link of the current page (multi-page navigation)
    if (href === currentPage) {
      link.classList.add("active");
    }

    // Map in-page links to their sections for scroll highlighting
    if (id && document.getElementById(id)) {
      sectionsById[id] = { link: link, section: document.getElementById(id) };
    } else if (!id && base === currentPage) {
      var homeSection = document.getElementById("home");
      if (homeSection) {
        sectionsById["home"] = { link: link, section: homeSection };
      }
    }
  });

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = null;

    Object.keys(sectionsById).forEach(function (id) {
      var s = sectionsById[id].section;
      if (s.offsetTop <= scrollPos) {
        currentId = id;
      }
    });

    Object.keys(sectionsById).forEach(function (id) {
      if (id === currentId) {
        sectionsById[id].link.classList.add("active");
      } else {
        sectionsById[id].link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
});
