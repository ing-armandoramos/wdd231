const resultsDiv = document.querySelector("#join-request-confirmation");
resultsDiv.innerHTML = "";

const formData = new URLSearchParams(window.location.search);

let submittedDateString = new Date(+formData.get('timestamp')).toLocaleDateString("en-US");
let submittedTimeString = new Date(+formData.get('timestamp')).toLocaleTimeString("en-US");

const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const p4 = document.createElement("p");
const p5 = document.createElement("p");

p1.textContent = `Applicant Name: ${formData.get('fname')} ${formData.get('lname')}`
p2.textContent = `Telephone Number: ${formData.get('phone')}`
p3.textContent = `Email Address: ${formData.get('email')}`
p4.textContent = `Organization Name: ${formData.get('organization')}`
p5.textContent = `Submission Date and Time: ${submittedDateString} ${submittedTimeString}`

resultsDiv.appendChild(p1);
resultsDiv.appendChild(p2);
resultsDiv.appendChild(p3);
resultsDiv.appendChild(p4);
resultsDiv.appendChild(p5);
