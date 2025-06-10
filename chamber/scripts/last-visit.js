
const msToDays = 86400000;
const visits = document.querySelector("#visits");
const h1 = document.querySelector("#visits h1");
const p = document.querySelector("#visits p");

let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

if(numVisits !== 0){
    localStorage.setItem("now", Date.now());
    const now = localStorage.getItem("now");
    const firstVisit = localStorage.getItem("firstVisit");
    let numberOfDays;

    numberOfDays = (now - firstVisit)/msToDays;
    modalVisit(numberOfDays, numVisits); 
}
else{
    
    localStorage.setItem("firstVisit", Date.now());
    modalVisit(0,1);
    
}

numVisits++;

localStorage.setItem("numVisits-ls", numVisits);

function modalVisit(days, numVisits){
    
    if((days == 0) && (numVisits == 1)){
        h1.innerHTML = `Welcome!`;
        p.innerHTML = `Let us know if you have any questions.`;
    }
    else if(parseInt(days) < 1){
        h1.innerHTML = `Thank you for coming back!`;
        p.innerHTML = `Enjoy your visit. `;
    }else if(parseInt(days) == 1){
            h1.innerHTML = `Welcome back!`;
            p.innerHTML = `You last visited ${parseInt(days)} day ago.`;
        }
        else
        {
            h1.innerHTML = `Welcome back!`;
            p.innerHTML = `You last visited ${parseInt(days)} days ago.`;
        }
    
};