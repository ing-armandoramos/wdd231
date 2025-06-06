const menuToggle = document.querySelector('.nav__toggle-menu')
const navMenu = document.querySelector('.nav')
const themeToggle = document.querySelector('.nav__toggle-theme')
const logo = document.querySelector('.header__logo')
const gridViewIcon = document.querySelector('#grid-view-btn img')
const listViewIcon = document.querySelector('#list-view-btn img')
document.addEventListener('DOMContentLoaded', function () {
	const currentYearElement = document.getElementById('current-year')
	if (currentYearElement) {
		currentYearElement.textContent = new Date().getFullYear()
	}
	const lastModifiedElement = document.getElementById('last-modified')
	if (lastModifiedElement) {
		const lastModified = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})
		lastModifiedElement.textContent = lastModified
	}
	if (menuToggle && navMenu) {
		menuToggle.addEventListener('click', function () {
			navMenu.classList.toggle('active')
		})
	}
	if (themeToggle && logo) {
		themeToggle.addEventListener('click', function () {
			document.body.classList.toggle('dark-theme')
			if (document.body.classList.contains('dark-theme')) {
				logo.src = 'images/shared/culiacan_sinaloa.svg'
				if (gridViewIcon && listViewIcon) {
					gridViewIcon.src = 'images/grid-button-dark.svg'
					listViewIcon.src = 'images/table-button-dark.svg'
				}
			} else {
				logo.src = 'images/shared/culiacan_sinaloa.svg'
				if (gridViewIcon && listViewIcon) {
					gridViewIcon.src = 'images/grid-button-light.svg'
					listViewIcon.src = 'images/table-button-light.svg'
				}
			}
		})
	}
	if (document.body.classList.contains('dark-theme') && logo) {
		logo.src = 'images/shared/culiacan_sinaloa.svg'
		if (gridViewIcon && listViewIcon) {
			gridViewIcon.src = 'images/grid-button-dark.svg'
			listViewIcon.src = 'images/table-button-dark.svg'
		}
	}
})