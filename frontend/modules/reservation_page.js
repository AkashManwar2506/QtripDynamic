import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const apiUrl = `${config.backendEndpoint}reservations/`
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch reservations: ${response.status}`);
    }

    const reservations = await response.json();
    return reservations;
  } catch (error) {
    console.log({"Error fetching reservations": error.message});
    return null; 
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // addReservationToTable(reservations);
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
 if (reservations && reservations.length > 0) {
    document.getElementById('no-reservation-banner').style.display = 'none';
    document.getElementById("reservation-table-parent").style.display = 'block'

    const tBody = document.getElementById('reservation-table');
    tBody.innerHTML = "";

    reservations.forEach(element => {
      const row = document.createElement('tr');

      const date = element.date;
      const [year, month, day] = date.split("-");
      const formattedDate = `${parseInt(day)}/${parseInt(month)}/${year}`;

      row.innerHTML = `
      <th scope="col">${element.id}</th>
      <th scope="col">${element.name}</th>
      <th scope="col">${element.adventureName}</th>
      <th scope="col">${element.person}</th>
      <th scope="col">${formattedDate}</th>
      <th scope="col">${element.price}</th>
      <th scope="col">${formatDateTime(element.time)}</th>
      <td class="reservation-visit-button" id="${element.id}" ><a href="${config.frontendEndpoint}pages/adventures/detail/?adventure=${element.adventure}">Visit Adventure</a></td>
      `;

      tBody.appendChild(row);
    });

  } else {
    document.getElementById("reservation-table-parent").style.display = 'none';
    document.getElementById("no-reservation-banner").style.display = 'block';
  }


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}
function formatDateTime(date) {
  date = new Date(date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  return `${day} ${month} ${year}, ${formattedHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
}

export { fetchReservations, addReservationToTable };
