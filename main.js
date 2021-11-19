let SPLASH_ACCESS_KEY = 'Mv5ciX8ax_wEAlRrzkbbwDGyLPCAvwj0TWnM7aQrd_s';
let SPLASH_SECRET_KEY = 'syrpXpbXjGNRkAFHW79JYUrgQRdALupUAqbtquceV8Y';
// Use getElementsByClassName to take advantage of live/dynamic feature. using query selector returns a static list
let cardContainer = document.getElementsByClassName('cards-container')[0];

// FOR LEARNING PURPOSES ==> ID can also be used
let form = document.querySelector('form[name="input-form"]');

// Select all the form values. use css selectors
let destName = form.querySelector("#name");
let destLocation = form.querySelector("#location");
let destPhoto = form.querySelector("#photo");
let destDescription = form.querySelector("#description");


// There are multiple ways of adding an event listener. You can use onclick, or .addEventListener Method
function addDestination(e) {
    e.preventDefault();
    cardContainer.append(createCard(destName.value, destLocation.value, destDescription.value));
    clearForm();
    // Make title dynamic. Check length of cardContainer
    if (cardContainer.children.length > 0) {
        //use textContent because it is type safe. Prevents script injection
        document.querySelector('#title').textContent = 'My Wishlist';
    }
}

function createCard(dest, loc, desc) {
    let card = document.createElement("div");
    // Preference is to use property instead of attributes and attriubte setters, except in some cases.
    card.className = 'card text-dark bg-info mb-3';
    card.style.width = '15rem';
    card.style.height = 'fit-content';
    // append instead of old school append-child
    fetchPhotoApiImg(dest).then(url => {
        card.prepend(createImg(url));
    });
    card.append(createCardBody(dest, loc, desc));
    return card;
}

function createImg(photoUrl) {
    console.log(photoUrl);
    let img = document.createElement("img");
    img.className = 'card-img-top';
    img.style.objectFit = 'fill';
    img.style.height = '10rem';
    img.alt = destName;
    if (isValidHttpUrl(photoUrl)) {
        img.setAttribute('src', `${photoUrl}`);
    } else {
        img.setAttribute('src', 'https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg');
    }
    return img;
}

function createCardBody(dest, loc, desc) {
    let cardBody = document.createElement("div");
    cardBody.className = 'card-body';

    let destH5 = document.createElement("h5");
    destH5.className = 'card-header';
    destH5.style.backgroundColor = 'yellow'
    destH5.textContent = dest;
    cardBody.append(destH5);

    let locH6 = document.createElement("h6");
    locH6.className = 'card-text';
    locH6.textContent = loc;
    cardBody.append(locH6);

    let descP = document.createElement("p");
    descP.className = 'card-text'
    descP.textContent = desc;
    cardBody.append(descP);

    cardBody.append(createButtons());

    return cardBody;
}

function createButtons() {
    let btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';
    let editBtn = document.createElement("button");
    let removeBtn = document.createElement("button");

    editBtn.className = 'btn btn-warning';
    editBtn.textContent = "Edit";
    editBtn.onclick = editCardInfo;

    removeBtn.className = 'btn btn-danger';
    removeBtn.textContent = "Remove";
    removeBtn.onclick = removeCard;

    btnContainer.append(editBtn);
    btnContainer.append(removeBtn);

    return btnContainer;
}

function editCardInfo(e) {
    console.log("edit button clicked: " + e);
    // e.currentTarget also works
    let cardBody = e.target.closest('.card-body');
    let dest = cardBody.children[0];
    let loc = cardBody.children[1];
    let desc = cardBody.children[2];

    let card = cardBody.closest('.card');
    let photoUrl = card.children[0];

    let newDest = prompt('Enter new name');
    let newLoc = prompt('Enter new location');
    let newPhotoUrl = prompt('Enter new photo url');
    let newDesc = prompt('Enter new description');

    if (newDest.length > 0) {
        dest.textContent = newDest;
    }

    if (newLoc.length > 0) {
        loc.textContent = newLoc;
    }
    if (newDesc.length > 0) {
        desc.textContent = newDesc;
    }

    if (newPhotoUrl.length > 0 && isValidHttpUrl(newPhotoUrl)) {
        photoUrl.setAttribute('src', newPhotoUrl);
    }
}

function removeCard(e) {
    console.log("remove button clicked: " + e);
    // Closest is a method that allows us to find the nearest ancestor with matching css class. 
    let cardBody = e.target.closest('.card-body');
    let card = cardBody.closest('.card');
    // remove allows us to manipulate the dom.
    card.remove();
    if (cardContainer.children.length == 0) {
        //use textContent because it is type safe. Prevents script injection
        document.querySelector('#title').textContent = 'Enter Destination Details';
    }
}

function clearForm() {
    // Clears out form values
    destName.value = '';
    destLocation.value = '';
    destPhoto.value = '';
    destDescription.value = '';
}

// Self explanatory
function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

async function fetchPhotoApiImg(dest) {

    let url = `https://api.unsplash.com/search/photos?query=${dest}&client_id=${SPLASH_ACCESS_KEY}&per_page=1&page=1`;
    let response = await fetch(url);
    console.log(response);
    if (response.ok) {
        let json = await response.json();
        console.log(json);
        console.log(json['results'][0]['urls']['raw']);
        return json['results'][0]['urls']['raw'];
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

async function fetchWeatherApiTemp(dest){
    
}