
// Select elements
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const hamburgerIcon = hamburgerBtn.querySelector('.hamburger-icon');

// Hamburger toggle
hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");

  // Toggle icon between ☰ and ✖
  if (navMenu.classList.contains("show")) {
    hamburgerIcon.innerHTML = "&times;";
  } else {
    hamburgerIcon.innerHTML = "&#9776;";
  }
});

// Wayfinding
const currentPath = window.location.pathname;
document.querySelectorAll(".nav-link").forEach(link => {
  if (currentPath.includes(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});
