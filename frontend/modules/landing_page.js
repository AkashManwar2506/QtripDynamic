import config from "../conf/index.js";
const baseURL = config.backendEndpoint;
const frontendURL = config.frontendEndpoint;

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let cities = await fetch(`${baseURL}cities`);
    if (!cities.ok) {
      throw new Error();
    }
    return await cities.json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let cardDiv = document.createElement("div");
  cardDiv.className = 'tile col-xs-12 col-sm-6 col-md-4 col-lg-3 gy-3';
  cardDiv.innerHTML = `
  <p class="tile-text">${city}</p>
  <a id=${id} href="${frontendURL}pages/adventures/?city=${id}">
  <img src="${image}" alt="">
  </a>`;

  document.getElementById('data').appendChild(cardDiv);

}

export { init, fetchCities, addCityToDOM };
