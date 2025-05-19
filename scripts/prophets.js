const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json'
const cards = document.querySelector('#cards')

async function getProphetsData() {
	const response = await fetch(url)
	const data = await response.json()
	console.log(data)
	console.table(data.prophets)

	displayProphets(data.prophets)
}

const displayProphets = (prophets) => {
	prophets.forEach((prophet) => {
		
		const card = document.createElement('section')
		const fullName = document.createElement('h2')
		const portrait = document.createElement('img')
		const birthDate = document.createElement('p')
		const birthPlace = document.createElement('p')

		
		card.classList.add('card')
		fullName.classList.add('card__name')
		portrait.classList.add('card__image')
		birthDate.classList.add('card__birthdate')
		birthPlace.classList.add('card__birthplace')

		
		fullName.textContent = `${prophet.name} ${prophet.lastname}`

		
		portrait.setAttribute('src', prophet.imageurl)
		portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - Latter-day Prophet`)
		portrait.setAttribute('loading', 'lazy')
		portrait.setAttribute('width', '340')
		portrait.setAttribute('height', '400')

		
		birthDate.textContent = `Date of Birth: ${prophet.birthdate}`
		birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`

		
		card.appendChild(fullName)
		card.appendChild(birthDate)
		card.appendChild(birthPlace)
		card.appendChild(portrait)

		
		cards.appendChild(card)
	})
}

getProphetsData()