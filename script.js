/* =========================================================
   ASTROLOGY RESEARCH & EDUCATION FOUNDATION
   INTERACTIONS • NAVIGATION • FORM • GALLERY
========================================================= */

(function () {

  "use strict";


  /* =======================================================
     DOM READY
  ======================================================= */

  document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav a");
    const revealElements = document.querySelectorAll(".reveal");
    const serviceLinks = document.querySelectorAll("[data-service]");
    const serviceSelect = document.querySelector("#serviceSelect");
    const contactForm = document.querySelector("#contactForm");
    const formStatus = document.querySelector("#formStatus");
    const yearElement = document.querySelector("#year");

    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = document.querySelector("#lightboxImage");
    const lightboxClose = document.querySelector(".lightbox-close");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

      if (!header) return;

      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

    }

    handleHeaderScroll();

    window.addEventListener(
      "scroll",
      handleHeaderScroll,
      { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && nav) {

      menuToggle.addEventListener("click", function () {

        const isOpen = nav.classList.toggle("active");

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        menuToggle.setAttribute(
          "aria-label",
          isOpen
            ? "Close navigation"
            : "Open navigation"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";

      });


      /* Close menu after clicking a navigation link */

      navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

          nav.classList.remove("active");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
          );

          menuToggle.textContent = "☰";

        });

      });


      /* Close menu when clicking outside */

      document.addEventListener("click", function (event) {

        if (
          nav.classList.contains("active") &&
          !nav.contains(event.target) &&
          !menuToggle.contains(event.target)
        ) {

          nav.classList.remove("active");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
          );

          menuToggle.textContent = "☰";

        }

      });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {

      const revealObserver = new IntersectionObserver(
        function (entries, observer) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


      revealElements.forEach(function (element, index) {

        element.style.transitionDelay =
          Math.min(index % 5, 4) * 70 + "ms";

        revealObserver.observe(element);

      });

    } else {

      revealElements.forEach(function (element) {
        element.classList.add("visible");
      });

    }


    /* =====================================================
       SERVICE → CONTACT FORM
    ===================================================== */

    serviceLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        const selectedService =
          link.getAttribute("data-service");

        if (serviceSelect && selectedService) {

          serviceSelect.value = selectedService;

        }

      });

    });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    function openLightbox(imageUrl, altText) {

      if (!lightbox || !lightboxImage) return;

      lightboxImage.src = imageUrl;
      lightboxImage.alt = altText || "Gallery image";

      lightbox.classList.add("active");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

    }


    function closeLightbox() {

      if (!lightbox || !lightboxImage) return;

      lightbox.classList.remove("active");

      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.style.overflow = "";

      setTimeout(function () {

        if (!lightbox.classList.contains("active")) {
          lightboxImage.src = "";
        }

      }, 300);

    }


    galleryItems.forEach(function (item) {

      item.addEventListener("click", function () {

        const imageUrl =
          item.getAttribute("data-full");

        const image =
          item.querySelector("img");

        if (!imageUrl) return;

        openLightbox(
          imageUrl,
          image ? image.alt : "Gallery image"
        );

      });

    });


    if (lightboxClose) {

      lightboxClose.addEventListener(
        "click",
        closeLightbox
      );

    }


    if (lightbox) {

      lightbox.addEventListener(
        "click",
        function (event) {

          if (event.target === lightbox) {
            closeLightbox();
          }

        }
      );

    }


    /* ESC closes gallery */

    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Escape" &&
          lightbox &&
          lightbox.classList.contains("active")
        ) {

          closeLightbox();

        }

      }
    );


    /* =====================================================
       CONTACT FORM → WHATSAPP
    ===================================================== */

    if (contactForm) {

      contactForm.addEventListener(
        "submit",
        function (event) {

          event.preventDefault();

          const formData =
            new FormData(contactForm);


          const name =
            String(formData.get("name") || "").trim();

          const email =
            String(formData.get("email") || "").trim();

          const phone =
            String(formData.get("phone") || "").trim();

          const service =
            String(formData.get("service") || "").trim();

          const birthDate =
            String(formData.get("birthDate") || "").trim();

          const birthTime =
            String(formData.get("birthTime") || "").trim();

          const birthPlace =
            String(formData.get("birthPlace") || "").trim();

          const message =
            String(formData.get("message") || "").trim();


          if (
            !name ||
            !email ||
            !phone ||
            !service
          ) {

            if (formStatus) {

              formStatus.textContent =
                "Please fill in all required fields.";

            }

            return;

          }


          const whatsappNumber =
            "917999840072";


          let whatsappMessage =
`Hello Astrology Research & Education Foundation,

I would like to make an enquiry.

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}`;


          if (birthDate) {
            whatsappMessage +=
              `\nBirth Date: ${birthDate}`;
          }


          if (birthTime) {
            whatsappMessage +=
              `\nBirth Time: ${birthTime}`;
          }


          if (birthPlace) {
            whatsappMessage +=
              `\nBirth Place: ${birthPlace}`;
          }


          if (message) {
            whatsappMessage +=
              `\nMessage: ${message}`;
          }


          whatsappMessage +=
`\n\nPlease guide me regarding the next steps and appointment.`;


          const whatsappUrl =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);


          if (formStatus) {

            formStatus.textContent =
              "Opening WhatsApp...";

          }


          window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
          );


          /* Optional reset after submission */

          setTimeout(function () {

            contactForm.reset();

            if (formStatus) {
              formStatus.textContent = "";
            }

          }, 1200);

        }
      );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
      .querySelectorAll('a[href^="#"]')
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function (event) {

            const targetId =
              link.getAttribute("href");

            if (
              !targetId ||
              targetId === "#"
            ) {
              return;
            }


            const target =
              document.querySelector(targetId);

            if (!target) return;


            event.preventDefault();


            const headerHeight =
              header
                ? header.offsetHeight
                : 0;


            const targetPosition =
              target.getBoundingClientRect().top +
              window.scrollY -
              headerHeight;


            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });

          }
        );

      });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
      .querySelectorAll("img")
      .forEach(function (image) {

        image.addEventListener(
          "error",
          function () {

            image.style.opacity = "0.35";

          }
        );

      });


    /* =====================================================
       CONTACT FORM INPUT — PHONE CLEANUP
    ===================================================== */

    const phoneInput =
      document.querySelector(
        'input[name="phone"]'
      );

    if (phoneInput) {

      phoneInput.addEventListener(
        "input",
        function () {

          this.value =
            this.value.replace(
              /[^0-9+\-\s()]/g,
              ""
            );

        }
      );

    }


    /* =====================================================
       PREVENT LIGHTBOX IMAGE DRAG
    ===================================================== */

    if (lightboxImage) {

      lightboxImage.addEventListener(
        "dragstart",
        function (event) {
          event.preventDefault();
        }
      );

    }


    /* =====================================================
       YEAR SAFETY
    ===================================================== */

    if (yearElement && !yearElement.textContent) {
      yearElement.textContent =
        new Date().getFullYear();
    }

  });

})();

/* =========================================================
   UPI PAYMENT BUTTON
========================================================= */

const upiPaymentUrl =
  "upi://pay?pa=7999840072%40ibl&pn=Sarthak%20Anand&cu=INR";

function openUPI(event) {
  event.preventDefault();

  window.location.href = upiPaymentUrl;
}

const upiButton = document.getElementById("upiButton");
const qrPayment = document.getElementById("qrPayment");

if (upiButton) {
  upiButton.addEventListener("click", openUPI);
}

if (qrPayment) {
  qrPayment.addEventListener("click", openUPI);
}