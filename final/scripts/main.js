// Create all cards at once 
const fragment = document.createDocumentFragment();

techniques.forEach(technique => {
  const card = document.createElement('div');
  card.classList.add('technique-card');

  // Image
  const img = document.createElement('img');
  img.dataset.src = technique.photo_url; 
  img.alt = technique.name;
  img.loading = 'lazy';
  img.width = 300;
  img.height = 200;
  img.style.backgroundColor = '#f0f0f0'; 
  card.appendChild(img);

  // Card content
  card.innerHTML += `
    <h3>${technique.name}</h3>
    <p>Author: ${technique.author}</p>
    <p>Time to Learn: ${technique.time_to_learn_minutes} min</p>
    <p>Study Time: ${technique.time_in_pomodoros} Pomodoros</p>
  `;

  // Instructions button
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