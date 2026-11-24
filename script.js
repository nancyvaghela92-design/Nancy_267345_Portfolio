
/* ==================================
   NANCY VAGHELA - PORTFOLIO
   JAVASCRIPT
   ================================== */


/* 1. MOBILE NAVIGATION */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// CLOSE MENU WHEN A LINK IS CLICKED

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    });

});


/* 2. DARK AND LIGHT MODE */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");


// LOAD SAVED THEME

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

function updateThemeIcon() {

    const isDark = document.body.classList.contains("dark-theme");

    themeIcon.className = isDark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

}

updateThemeIcon();


// CHANGE THEME

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

    const currentTheme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";

    localStorage.setItem("portfolioTheme", currentTheme);

    updateThemeIcon();

});


/* 3. TYPING ANIMATION */

const typingElement = document.getElementById("typing");

const words = [
    "IT Graduate",
    "Python Developer",
    "AI Enthusiast",
    "Machine Learning Learner",
    "Creative Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typingEffect, 1300);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

        }

    }

    setTimeout(
        typingEffect,
        deleting ? 50 : 100
    );

}

typingEffect();


/* 4. SCROLL REVEAL ANIMATION */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* 5. ACTIVE NAVIGATION */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


/* 6. BACK TO TOP BUTTON */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* 7. CONTACT FORM */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();


    // CHECK EMPTY FIELDS

    if (!name || !email || !subject || !message) {

        formStatus.textContent = "Please fill in all fields.";

        return;

    }


    // PREPARE EMAIL

    const receiver = "nancyvaghela92@gmail.com";

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    const mailtoLink =
        "mailto:" + receiver +
        "?subject=" + emailSubject +
        "&body=" + emailBody;


    formStatus.textContent =
        "Opening your email application...";


    // OPEN EMAIL APPLICATION

    window.location.href = mailtoLink;

});


/* 8. AUTOMATIC COPYRIGHT YEAR */

document.getElementById("year").textContent =
    new Date().getFullYear();


console.log("Welcome to Nancy's Portfolio Website!");
