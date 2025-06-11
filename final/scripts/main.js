// scripts/main.js

// Import the techniques from data file (ES Module)
import { studyTechniques as techniques } from './data.mjs';

// Get the container where cards will be inserted
const container = document.getElementById('techniques-container');

// Function to create each card
function createTechniqueCard(technique) {
  // Create card container
  const card = document.createElement('div');
  card.classList.add('technique-card');

  // Add image
  const img = document.createElement('img');
  img.src = technique.photo_url;
  img.alt = technique.name;
  card.appendChild(img);

  // Add name as title
  const title = document.createElement('h3');
  title.textContent = technique.name;
  card.appendChild(title);

  // Add author
  const author = document.createElement('p');
  author.textContent = `Author: ${technique.author}`;
  card.appendChild(author);

  // Add time to learn
  const learnTime = document.createElement('p');
  learnTime.textContent = `Time to Learn: ${technique.time_to_learn_minutes} min`;
  card.appendChild(learnTime);

  // Add time in pomodoros
  const pomodoros = document.createElement('p');
  pomodoros.textContent = `Study Time: ${technique.time_in_pomodoros} Pomodoros`;
  card.appendChild(pomodoros);

  // Append card to container
  container.appendChild(card);
}

// Iterate over all techniques and create cards
techniques.forEach(createTechniqueCard);
