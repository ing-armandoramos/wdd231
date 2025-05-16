
const hamburgerBtn = document.getElementById('hamburgerBtn')
const primaryNav = document.getElementById('primaryNav')
const coursesContainer = document.getElementById('coursesContainer')
const totalCreditsSpan = document.getElementById('totalCredits')
const allBtn = document.getElementById('allBtn')
const cseBtn = document.getElementById('cseBtn')
const wddBtn = document.getElementById('wddBtn')


hamburgerBtn.addEventListener('click', () => {
	primaryNav.classList.toggle('responsive')
})


function displayCourses(coursesToDisplay) {
	
	coursesContainer.innerHTML = ''

	
	const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0)
	totalCreditsSpan.textContent = totalCredits

	
	coursesToDisplay.forEach((course) => {
		
		const card = document.createElement('div')

		
		const baseClass = 'course-card'
		const subjectClass = `course-card--${course.subject.toLowerCase()}`
		const statusClass = course.completed ? 'course-card--completed' : ''

		card.className = `${baseClass} ${subjectClass} ${statusClass}`.trim()

	
		const completionStatus = course.completed
			? '<span class="course-card__status">✓ Completed</span>'
			: '<span class="course-card__status">In Progress</span>'

		
		card.innerHTML = `
            <h3 class="course-card__code">${course.subject} ${course.number}</h3>
            <h4 class="course-card__title">${course.title}</h4>
            <p class="course-card__credits">Credits: ${course.credits}</p>
            <p class="course-card__tech">Technologies: ${course.technology.join(', ')}</p>
            ${completionStatus}
        `

		
		coursesContainer.appendChild(card)
	})
}


allBtn.addEventListener('click', () => {
	setActiveButton(allBtn)
	displayCourses(courses)
})

cseBtn.addEventListener('click', () => {
	setActiveButton(cseBtn)
	const cseCourses = courses.filter((course) => course.subject === 'CSE')
	displayCourses(cseCourses)
})

wddBtn.addEventListener('click', () => {
	setActiveButton(wddBtn)
	const wddCourses = courses.filter((course) => course.subject === 'WDD')
	displayCourses(wddCourses)
})


function setActiveButton(button) {
	;[allBtn, cseBtn, wddBtn].forEach((btn) => {
		btn.classList.remove('active')
	})
	button.classList.add('active')
}


document.getElementById('currentYear').textContent = new Date().getFullYear()


document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`


displayCourses(courses)