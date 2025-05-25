const menuToggle = document.querySelector('.nav__toggle-menu')
const navMenu = document.querySelector('.nav')
const themeToggle = document.querySelector('.nav__toggle-theme')
const logo = document.querySelector('.header__logo')
const gridViewIcon = document.querySelector('#grid-view-btn img')
const listViewIcon = document.querySelector('#list-view-btn img')

document.addEventListener('DOMContentLoaded', function () {
	menuToggle.addEventListener('click', function () {
		navMenu.classList.toggle('active')
	})
	themeToggle.addEventListener('click', function () {
		document.body.classList.toggle('dark-theme')

		if (document.body.classList.contains('dark-theme')) {
			
			// Dark icons
			gridViewIcon.src = 'images/grid-button-dark.svg'
			listViewIcon.src = 'images/table-button-dark.svg'
		} else {
			
			// Light icons
			gridViewIcon.src = 'images/grid-button-light.svg'
			listViewIcon.src = 'images/table-button-light.svg'
		}
	})

	// Set based on system preferences
	if (document.body.classList.contains('dark-theme')) {
		logo.src = 'images/shared/chamber-logo-dark.svg'
		// Set dark icons at start
		if (gridViewIcon && listViewIcon) {
			gridViewIcon.src = 'images/grid-button-dark.svg'
			listViewIcon.src = 'images/table-button-dark.svg'
		}
	}
})