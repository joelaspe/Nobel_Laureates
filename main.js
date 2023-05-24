/*** GLOBAL VARIABLES */
const API_BASE_URL = 'https://api.nobelprize.org/2.1/nobelPrize/';

/*** Event Listeners */
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener('click', getData);


/** Makes the API call to the nobel prize API */
async function getData() {
    const yearInputElement = document.querySelector("#year-input");
    const year = yearInputElement.value;
    const apiString = generateApiStringCategoryAndYear('che', year);

    const response = await fetch(apiString);
    const data = await response.json();
    console.log(data);   
}

function generateApiStringCategoryAndYear(category, year) {
    return API_BASE_URL + category + "/" + year;
}