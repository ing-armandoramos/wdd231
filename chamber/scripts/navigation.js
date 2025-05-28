const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const homeButton = document.querySelector('#home');
const discoveryButton = document.querySelector('#discovery');
const directoryButton = document.querySelector('#directory');
const joinProfileButton = document.querySelector('#join');
const joinNowButton = document.querySelector('#join-now-button');

homeButton.addEventListener('click', () => {
    homeButton.classList.add("active");
    discoveryButton.classList.remove("active");
    directoryButton.classList.remove("active");
    joinProfileButton.classList.remove("active");
});

discoveryButton.addEventListener('click', () => {
    homeButton.classList.remove("active");
    discoveryButton.classList.add("active");
    directoryButton.classList.remove("active");
    joinProfileButton.classList.remove("active");
});

directoryButton.addEventListener('click', () => {
    homeButton.classList.remove("active");
    discoveryButton.classList.remove("active");
    directoryButton.classList.add("active");
    joinProfileButton.classList.remove("active");
});

joinProfileButton.addEventListener('click', () => {
    homeButton.classList.remove("active");
    discoveryButton.classList.remove("active");
    directoryButton.classList.remove("active");
    joinProfileButton.classList.add("active");
});

if (joinNowButton != null) {
    joinNowButton.addEventListener('click', () => {
        homeButton.classList.remove("active");
        discoveryButton.classList.remove("active");
        directoryButton.classList.remove("active");
        joinProfileButton.classList.add("active");
        window.location.replace('join.html');
    });

}