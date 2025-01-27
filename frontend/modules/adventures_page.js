
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(`${config.backendEndpoint}adventures?city=${city}`);
    if (!res.ok){
      throw new Error();
    }
    return await res.json();

  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let container = document.getElementById('data');
  adventures.forEach(element => {
    let card = document.createElement('div');
    card.className = 'activity-card col-md-6';
    card.innerHTML = `
      <a id="${element.id}" href="${config.frontendEndpoint}pages/adventures/detail/?adventure=${element.id}">
        <img src="${element.image}" class="activity-card-image" alt="...">  
        <div class="category-banner">${element.category}</div> 
      </a>
      <div class="experience-content">
        <ul>
          <li>${element.name}</li>
          <li>₹${element.costPerHead}</li>
        </ul>
      </div>
      
    `;
    container.appendChild(card);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  return list.filter(e => {
    if (e.duration>low && e.duration<=high) return true;
    return false
  })

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredAdventures = list.filter(e => {
    if (categoryList.includes(e.category)) return true;
    else return false;
  })

  return filteredAdventures;

}


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if (filters.category.length && filters.duration){
    let [low, high] = filters.duration.split('-').map(Number);
    return filterByDuration(filterByCategory(list, filters.category), low, high);
  }else if (filters.duration){
    let [low, high] = filters.duration.split('-').map(Number);
    return filterByDuration(list, low, high)
  }else if (filters.category.length){
    return filterByCategory(list, filters.category);
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem('filters'))
  
  return filters;
  // Place holder for functionality to work in the Stubs
  // return null;
}

// let crosses = document.querySelectorAll('.crossEvent');
// crosses.forEach(e => {
//   e.addEventListener('click', event => {
//     let filters = getFiltersFromLocalStorage();
//     if (event.target.name === "duration"){
//       filters.duration = "";
//     }else {
//       let value = event.target.value;
//       filters.category.filter(ele => ele!=value);
//     }
  
//     generateFilterPillsAndUpdateDOM(filters);
//     addAdventureToDOM(filterFunction(list, filters));
//     saveFiltersToLocalStorage(filters);
  
//   })
// })

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pillsSection = document.getElementById('category-list');
  // if (filters.duration) {
  //   let pill = document.createElement('div');
  //   pill.setAttribute("name", "duration");
  //   pill.className = 'category-filter d-flex crossEvent';
  //   pill.innerHTML = `${filters.duration} Hours <span>x</span>`;
  //   pillsSection.appendChild(pill);
  // }

  filters.category.forEach(e => {
    let pill = document.createElement('div');
    pill.setAttribute("name", "category");
    pill.setAttribute("value", e);
    pill.className = 'category-filter d-flex crossEvent';
    pill.innerHTML = `${e} <span>x</span>`;
    pillsSection.appendChild(pill);
  })


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
