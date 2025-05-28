const url = "data/members.json";
const cards = document.querySelector('#business_content_container');
const cardViewButton = document.querySelector("#card-view-button");
const listViewButton = document.querySelector("#list-view-button");
const numberPattern = /\d+/g;

cardViewButton.addEventListener('click', () => {
    getBusinessData("card");
});

listViewButton.addEventListener('click', () => {
    getBusinessData("list");
});

const displayLogoCards = (members) => {

    cards.classList.add("card_container");
    cards.classList.remove("list_container");

    members.forEach((member) => {
        const card = document.createElement("section");
        card.className = "logo_card";

        const companyLogo = document.createElement("img");
        companyLogo.setAttribute("src", `images/${member.icon_image}`);
        companyLogo.setAttribute("alt", `${member.name} Main Image`);
        companyLogo.setAttribute("width", "180");
        companyLogo.setAttribute("height", "180");
        companyLogo.setAttribute("loading", "lazy");
        companyLogo.setAttribute("tabindex", "0");

        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const p4 = document.createElement("p");

        p1.setAttribute("tabindex", "0");

        p1.textContent = `${member.address.street1} ${member.address.city} ${member.address.state} ${member.address.zip}`;

        const a2 = document.createElement("a");
        const a3 = document.createElement("a");
        const a4 = document.createElement("a");

        a2.setAttribute("href", `mailto:${member.email}`);
        a2.setAttribute("tabindex", "0");

        a3.setAttribute("href", `tel:+${member.phone_number.match( numberPattern )}`);
        a3.setAttribute("tabindex", "0");

        a4.setAttribute("href", `https://${member.website_url}`);
        a4.setAttribute("tabindex", "0");

        a2.textContent = member.email;
        a3.textContent = member.phone_number;
        a4.textContent = member.website_url;

        p2.appendChild(a2);

        p3.appendChild(a3);

        p4.appendChild(a4);

        card.appendChild(companyLogo);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(p3);
        card.appendChild(p4);

        cards.appendChild(card);
    });
}

const displayBusinessList = (members) => {

    let rowNumber = 0;

    cards.classList.remove("card_container");
    cards.classList.add("list_container");

    members.forEach((member) => {
        const list_div = document.createElement("div");
        const companyName = document.createElement("p");
        const address = document.createElement("p");
        const phoneNumber = document.createElement("p");
        const homepage = document.createElement("p");

        if (rowNumber % 2 == 0) {
            list_div.className = "white_list_div";     
        }
        else {
            list_div.className = "shaded_list_div";      
        }

        rowNumber += 1;

        companyName.className = "company_name";
        address.className = "address";
        phoneNumber.className = "phone_number";
        homepage.className = "website";

        companyName.setAttribute("tabindex", "0");
        address.setAttribute("tabindex", "0");

        const a3 = document.createElement("a");
        const a4 = document.createElement("a");

        a3.setAttribute("href", `tel:+${member.phone_number.match( numberPattern )}`);
        a3.setAttribute("tabindex", "0");

        a4.setAttribute("href", `https://${member.company_image_url}`);
        a4.setAttribute("tabindex", "0");

        a3.textContent = member.phone_number;
        a4.textContent = member.website_url;

        companyName.textContent = member.name;
        address.textContent = member.address.street1;

        phoneNumber.appendChild(a3);
        homepage.appendChild(a4);

        list_div.appendChild(companyName);
        list_div.appendChild(address);
        list_div.appendChild(phoneNumber);
        list_div.appendChild(homepage);
        cards.appendChild(list_div);
    });
}

const getBusinessData = async (displayBusinessStyleValue) => {
    cards.innerHTML = "";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        

        if (displayBusinessStyleValue == "card") {
            displayLogoCards(data.members);
        } else if (displayBusinessStyleValue == "list") {
            displayBusinessList(data.members);
        }
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

getBusinessData("card");