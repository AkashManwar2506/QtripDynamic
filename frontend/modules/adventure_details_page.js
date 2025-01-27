import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get("adventure");
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(
      `${config.backendEndpoint}adventures/detail?adventure=${adventureId}`
    );
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  
  addBootstrapPhotoGallery(adventure.images)
  
  let content = document.getElementById('adventure-content');
  let paragraph = document.createElement('p');
  paragraph.innerHTML = adventure.content;
  content.append(paragraph);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let container = document.createElement('div');
  container.setAttribute('id', 'carouselExampleIndicators');
  container.className = "carousel slide";
  container.setAttribute('data-bs-ride', 'carousel');
  container.innerHTML = 
  `<div class="carousel-indicators">
  ${images.map((e, i)=>{
    if (i===0) return `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
    else return `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`
  }).join(" ")}
  
  </div>
  <div class="carousel-inner">
  ${images.map((e, i)=>{
    if (i===0) {
    return `<div class="carousel-item active activity-card-image">
    <img src="${e}" class="d-block w-100" alt="...">
  </div>`}
    else {
    return `<div class="carousel-item activity-card-image">
    <img src="${e}" class="d-block w-100" alt="...">
  </div>`}

  }).join(" ")}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`;
  let gallery = document.getElementById("photo-gallery");
  gallery.innerHTML = "";
  gallery.appendChild(container);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  let soldOutDiv = document.getElementById('reservation-panel-sold-out');
  let reverseDiv = document.getElementById('reservation-panel-available');
  document.getElementById('reservation-person-cost').innerHTML = String(adventure.costPerHead);
  document.getElementById('reservation-cost').innerHTML = String(adventure.costPerHead);

  // console.log(adventure.reserved);
  if (!adventure.available) {
    soldOutDiv.style.display = 'block';
    reverseDiv.style.display = 'none';
  } else {
    reverseDiv.style.display = 'block';
    soldOutDiv.style.display = 'none';
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = Number(adventure.costPerHead) * Number(persons);

  const totalAmount = document.getElementById("reservation-cost");
  totalAmount.innerHTML = String(totalCost);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.getElementById("myForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const date = document.getElementById("dateInput").value;
    const person = document.getElementById("person").value;

    const requestBody = {
      name: name,
      date: date,
      person: parseInt(person), 
      adventure: adventure.id,
    };

    // Make POST API call
    fetch(`${config.backendEndpoint}reservations/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then(()=>{
      alert("Success!");
    }).catch((err)=> {
      alert("Failed!");
    })
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = 'block';
  } else {
    document.getElementById("reserved-banner").style.display = 'none'
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
