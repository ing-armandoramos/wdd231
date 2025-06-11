// scripts/ambient.js

const container = document.getElementById('ambient-container');

// Title
const title = document.createElement('h2');
title.textContent = 'Ambient Sounds';
container.appendChild(title);

// Create select dropdown
const select = document.createElement('select');
select.id = 'trackSelector';

// Example track list (add your real files here)
const tracks = [
  { name: 'Rainforest', src: 'audio/rainforest.mp3' },
  { name: 'Ocean Waves', src: 'audio/ocean.mp3' },
  { name: 'Coffee Shop', src: 'audio/coffeeshop.mp3' }
];

// Populate dropdown
tracks.forEach(track => {
  const option = document.createElement('option');
  option.value = track.src;
  option.textContent = track.name;
  select.appendChild(option);
});

container.appendChild(select);

// Create audio element
const audio = document.createElement('audio');
audio.controls = true;
audio.src = tracks[0].src;
audio.loop=true;
audio.autoplay=true;
container.appendChild(audio);

// Handle track change
select.addEventListener('change', () => {
  audio.src = select.value;
  audio.play();
});

// Fullscreen button
const fullscreenButton = document.createElement('button');
fullscreenButton.textContent = 'Go Fullscreen';
fullscreenButton.onclick = () => {
  document.documentElement.requestFullscreen();
};

container.appendChild(fullscreenButton);
