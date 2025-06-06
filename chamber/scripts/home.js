const weatherUrl =
	'https://api.openweathermap.org/data/2.5/weather?lat=24.8047297&lon=-107.3933532&appid=9bf53705e5c31dcdfcda644647276e7f&units=metric'
const membersUrl = 'data/members.json'


document.addEventListener('DOMContentLoaded', () => {
	apiFetch(weatherUrl, 'weather')
	apiFetch(membersUrl, 'members')
})
/**
 * Fetch data from API and display results
 * @param {string} url
 * @param {string} type
 */
async function apiFetch(url, type) {
	try {
		const response = await fetch(url)
		if (response.ok) {
			const data = await response.json()
			displayResults(data, type)
		} else {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
	} catch (error) {
		console.log(`Error fetching ${type} data:`, error)
	}
}
/**
 * Display API results in the DOM
 * @param {Object} data
 * @param {string} type
 */
function displayResults(data, type) {
	if (type === 'weather') {
		const currentTemp = document.querySelector('.weather__current-temp')
		if (currentTemp) {
			currentTemp.textContent = `${Math.round(data.main.temp)}°F`
		}
		const description = document.querySelector('.weather__description')
		if (description) {
			description.textContent = data.weather[0].description
		}
		const weatherIcon = document.querySelector('.weather__icon img')
		if (weatherIcon) {
			weatherIcon.src = 'images/day_sandstorm_icon.svg'
			weatherIcon.alt = data.weather[0].description
		}
		const weatherValues = document.querySelectorAll('.weather__value')
		if (weatherValues.length >= 4) {
			weatherValues[0].textContent = `${Math.round(data.main.temp_max)}°F / ${Math.round(data.main.temp_min)}°F`
			weatherValues[1].textContent = `${data.main.humidity}%`
			const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			})
			weatherValues[2].textContent = sunriseTime
			const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			})
			weatherValues[3].textContent = sunsetTime
		}
	} else if (type === 'members') {
		const randomMembers = data.members.sort(() => Math.random() - 0.5).slice(0, 3)
		const spotlightGrid = document.querySelector('.spotlights__grid')
		if (spotlightGrid) {
			spotlightGrid.innerHTML = ''
			randomMembers.forEach((member) => {
				const article = document.createElement('article')
				article.className = 'spotlight-card'
				article.innerHTML = `
					<div class="spotlight-card__image">
						<img src="${member.image}" alt="${member.name} logo" width="300" height="200">
					</div>
					<div class="spotlight-card__content">
						<h3 class="spotlight-card__title">${member.name}</h3>
						<p class="spotlight-card__membership">${member.membershipLevel} Member</p>
						<div class="spotlight-card__contact">
							<p class="spotlight-card__phone">${member.phone}</p>
							<p class="spotlight-card__address">${member.address}</p>
						</div>
						<a href="${member.website}" class="spotlight-card__website" target="_blank" rel="noopener">Visit Website</a>
					</div>
				`
				spotlightGrid.appendChild(article)
			})
		}
	}
}