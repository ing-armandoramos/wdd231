/*// scripts/main.js

// Import the techniques from data file (ES Module)
import { studyTechniques as techniques } from './data.mjs';

// Get the container where cards will be inserted
const container = document.getElementById('techniques-container');

// Create modal elements
const modal = document.createElement('div');
modal.id = 'instructions-modal';
modal.classList.add('modal');
modal.style.display = 'none';

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

const closeBtn = document.createElement('span');
closeBtn.classList.add('close-btn');
closeBtn.innerHTML = '&times;';

const modalTitle = document.createElement('h2');
modalTitle.id = 'modal-title';

const modalText = document.createElement('p');
modalText.id = 'modal-text';

modalContent.appendChild(closeBtn);
modalContent.appendChild(modalTitle);
modalContent.appendChild(modalText);
modal.appendChild(modalContent);
document.body.appendChild(modal);

// Close modal when clicking the X button
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Function to create each card
function createTechniqueCard(technique) {
  // Create card container
  const card = document.createElement('div');
  card.classList.add('technique-card');

  // Add image
  const img = document.createElement('img');
  img.src = technique.photo_url;
  img.alt = technique.name;
  img.loading = 'lazy';
  img.width = 300;
  img.height = 200;
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

  // Add Instructions button if instructions exist
  if (technique.instructions) {
    const instructionsBtn = document.createElement('button');
    instructionsBtn.textContent = 'Instructions';
    instructionsBtn.classList.add('instructions-btn');
    card.appendChild(instructionsBtn);

    // Show modal with instructions when button is clicked
    instructionsBtn.addEventListener('click', () => {
      modalTitle.textContent = `${technique.name} Instructions`;
      modalText.textContent = technique.instructions;
      modal.style.display = 'block';
    });
  }

  // Append card to container
  container.appendChild(card);
}

// Iterate over all techniques and create cards
techniques.forEach(createTechniqueCard);

*/

// Import the techniques from data file (ES Module)
import { studyTechniques as techniques } from './data.mjs';

// Get the container where cards will be inserted
const container = document.getElementById('techniques-container');

// --- Optimized Modal Creation (Single Event Listener) ---
const modal = document.createElement('div');
modal.id = 'instructions-modal';
modal.classList.add('modal');
modal.style.display = 'none';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h2 id="modal-title"></h2>
    <p id="modal-text"></p>
  </div>
`;
document.body.appendChild(modal);

// Event delegation for modal close (better performance)
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn') || e.target === modal) {
    modal.style.display = 'none';
  }
});

// --- Optimized Card Creation (DocumentFragment + Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target.querySelector('img');
      if (img && !img.src) {
        img.src = img.dataset.src; // Load image only when visible
      }
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '100px' }); // Start loading 100px before entering viewport

// Create all cards at once (minimize reflows)
const fragment = document.createDocumentFragment();

techniques.forEach(technique => {
  const card = document.createElement('div');
  card.classList.add('technique-card');

  // Image (lazy-loaded with placeholder)
  const img = document.createElement('img');
  img.dataset.src = technique.photo_url; // Store URL in data-src
  img.alt = technique.name;
  img.loading = 'lazy';
  img.width = 300;
  img.height = 200;
  img.style.backgroundColor = '#f0f0f0'; // Placeholder color
  card.appendChild(img);

  // Card content (optimized string concatenation)
  card.innerHTML += `
    <h3>${technique.name}</h3>
    <p>Author: ${technique.author}</p>
    <p>Time to Learn: ${technique.time_to_learn_minutes} min</p>
    <p>Study Time: ${technique.time_in_pomodoros} Pomodoros</p>
  `;

  // Instructions button (conditionally added)
  if (technique.instructions) {
    const btn = document.createElement('button');
    btn.className = 'instructions-btn';
    btn.textContent = 'Instructions';
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
      modal.querySelector('#modal-title').textContent = `${technique.name} Instructions`;
      modal.querySelector('#modal-text').textContent = technique.instructions;
    });
    card.appendChild(btn);
  }

  fragment.appendChild(card);
  observer.observe(card); // Track visibility for lazy loading
});

container.appendChild(fragment);