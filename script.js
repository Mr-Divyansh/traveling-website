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
});
