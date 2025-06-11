import { studyTechniques } from './data/methoddata.mjs';

const container = document.getElementById('techniques-container');

function createTechniqueCard(technique) {
  const card = document.createElement('div');
  card.classList.add('technique-card');

  const title = document.createElement('h2');
  title.textContent = technique.name;

  const desc = document.createElement('p');
  desc.textContent = technique.description;

  card.appendChild(title);
  card.appendChild(desc);

  return card;
}

function renderTechniques() {
  studyTechniques.forEach(technique => {
    const card = createTechniqueCard(technique);
    container.appendChild(card);
  });
}

renderTechniques();
