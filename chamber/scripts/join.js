function setTimestamp() {
	const timestampField = document.getElementById('timestamp')
	if (timestampField) {
		const now = new Date()
		timestampField.value = now.toISOString()
	}
}
function initializeModals() {
	const modalTriggers = document.querySelectorAll('[data-modal]')
	const modalCloseElements = document.querySelectorAll('[data-close-modal]')
	modalTriggers.forEach((trigger) => {
		trigger.addEventListener('click', function () {
			const modalId = this.getAttribute('data-modal')
			openModal(modalId)
		})
	})
	modalCloseElements.forEach((closeElement) => {
		closeElement.addEventListener('click', function () {
			closeModal()
		})
	})
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			closeModal()
		}
	})
}

function animateMembershipCards() {
	const membershipCards = document.querySelectorAll('.membership__card')
	membershipCards.forEach((card, index) => {
		card.classList.add('membership__card--animated')
		card.style.setProperty('--animation-delay', `${index * 0.5}s`)
	})
}
function initializeFormValidation() {
	const form = document.querySelector('.join__form')
	if (!form) return
	form.addEventListener('submit', validateForm)
}
/**
 * Validates the form before submission using helper text
 * @param {Event} event
 */
function validateForm(event) {
	const form = event.target
	const requiredFields = form.querySelectorAll('[required]')
	let isValid = true
	let firstInvalidField = null
	requiredFields.forEach((field) => {
		const helpText = field.parentNode.querySelector('.form__help-text')
		if (!field.value.trim()) {
			isValid = false
			if (helpText) {
				helpText.classList.add('form__help-text--error')
			}
			if (!firstInvalidField) {
				firstInvalidField = field
			}
		} else {
			if (helpText) {
				helpText.classList.remove('form__help-text--error')
			}
		}
	})
	if (!isValid) {
		event.preventDefault()

		if (firstInvalidField) {
			firstInvalidField.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})
			firstInvalidField.focus()
		}
	}
}

function init() {
	setTimestamp()
	initializeModals()
	animateMembershipCards()
	initializeFormValidation()
}
document.addEventListener('DOMContentLoaded', init)

/**
 * Opens a modal by its ID
 * @param {string} modalId
 */
function openModal(modalId) {
	const modal = document.getElementById(modalId)
	if (modal) {
		modal.style.display = 'flex'
		modal.setAttribute('aria-hidden', 'false')
		const modalContent = modal.querySelector('.modal__content')
		if (modalContent) {
			modalContent.focus()
		}
		document.body.style.overflow = 'hidden'
	}
}
function closeModal() {
	const openModal = document.querySelector('.modal[style*="flex"]')
	if (openModal) {
		openModal.style.display = 'none'
		openModal.setAttribute('aria-hidden', 'true')
		document.body.style.overflow = ''
		const modalId = openModal.id
		const triggerButton = document.querySelector(`[data-modal="${modalId}"]`)
		if (triggerButton) {
			triggerButton.focus()
		}
	}
}