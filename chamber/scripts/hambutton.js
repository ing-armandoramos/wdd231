const hamburgerButton = document.querySelector("#hamButton");
const navElement = document.querySelector("#animated-nav");

hamburgerButton.addEventListener("click", () => {
    navElement.classList.toggle("open");
    hamburgerButton.classList.toggle("open");
});