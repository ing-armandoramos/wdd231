import {places} from "../data/places.mjs"

const message = document.querySelector("#message");
const description = document.querySelector("#message p");
const closeButton = document.querySelector("#message button");
const title = document.querySelector("#message h2");

closeButton.addEventListener("click", () => {message.close()});

const displayPlaces = (places) =>{
    places.forEach(place => {
        
        let card = document.createElement("figure");
        let name = document.createElement("h2");
        let address = document.createElement("address");
        let cost = document.createElement("p");
        let photo = document.createElement("img");
        let learnMore = document.createElement("input");
        
        name.textContent = `${place.name}`;
        address.textContent = `Find us at: ${place.address}`;
        cost.textContent = `Cost: ${place.cost}`;
        cost.setAttribute("id","cost");
        photo.setAttribute("src", place.photo_url);
        photo.setAttribute("alt", `${place.name}`);
        photo.setAttribute("loading", "lazy");
        learnMore.setAttribute("type", "submit");
        learnMore.setAttribute("value", "Learn More");
        learnMore.setAttribute("id", "learn");

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(cost);
        card.appendChild(photo); 
        card.appendChild(learnMore);      
        
        learnMore.addEventListener("click", () => {modalDescription(place)});

        document.querySelector("#cards").appendChild(card);
    });
}

displayPlaces(places);

function modalDescription(place){
    
    title.innerHTML = place.name;
    description.innerHTML = place.description;
    message.showModal();
    
}