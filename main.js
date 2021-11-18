let cardContainer = document.querySelector('.cards-container');

let form = document.querySelector('form[name="input-form"]');
let dest = form.querySelector("#name");
let loc = form.querySelector("#location");
let photoUrl = form.querySelector("#photo");
var desc = form.querySelector("#description");

let addToList = document.querySelector("#addToList");

function addDestination() {
    console.log("You clicked this button");
    console.log(dest.value);
    console.log(loc.value);
    console.log(photoUrl.value);
    console.log(photoUrl);
    console.log(desc.value);

    createCard(dest.value, loc.value, photoUrl.value, desc.value);
    clearForm();
}

function createCard(dest, loc, photo, desc) {
    let card = document.createElement("div");
    card.append(createImg(photo));
    card.append(createText(dest, loc, desc));
    card.append(...createButtons());
    cardContainer.append(card);
}

function createImg(photo = 'https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg') {
    let img = document.createElement("img");
    img.src = photo;
    console.log(img);
    return img;
}

function createText(dest, loc, desc) {
    let cardBody = document.createElement("div");

    let destH5 = document.createElement("h5");
    destH5.textContent = dest;
    cardBody.append(destH5);

    let locH6 = document.createElement("h6");
    locH6.textContent = loc;
    cardBody.append(locH6);

    let descP = document.createElement("p");
    descP.textContent = desc;
    cardBody.append(descP);

    return cardBody;
}

function createButtons() {
    let result = [];
    let editBtn = document.createElement("button");
    let removeBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    editBtn.onclick = editCardInfo;
    removeBtn.textContent = "Remove";
    removeBtn.onclick = removeCard;

    result.push(editBtn);
    result.push(removeBtn);
    return result;
}

function editCardInfo() {
    console.log("edit button clicked");
}

function removeCard() {
    console.log("remove button clicked");
}

function clearForm() {
    console.log("Clear function was reached");
    dest.value = '';
    loc.value = '';
    photoUrl.value = '';
    desc.value = '';
}