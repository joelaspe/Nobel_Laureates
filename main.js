/*** SETUP */


/* Update the year input element to allow current year for timeproofing */
const dateNow = new Date();
const yearNow = dateNow.getFullYear();
$('#year-input').attr('max', yearNow);

/*** GLOBAL VARIABLES */
const API_BASE_URL = 'https://api.nobelprize.org/2.1/nobelPrize/';


/*** Event Listeners */
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener('click', getData);


/** Makes the API call to the nobel prize API */
async function getData() {
    const yearInputElement = document.querySelector("#year-input");
    const year = yearInputElement.value;
    const categoryInputElement = document.querySelector('#category-choice');
    const categoryChoice = makeAPIFriendlyCategoryName(categoryInputElement.value);
    const apiString = generateApiStringCategoryAndYear(categoryChoice,year);

    const response = await fetch(apiString);
    const data = await response.json();
    
    console.log(data); //FIXME: remove in final version
    processData(data);

    


}

function makeAPIFriendlyCategoryName(name) {
    switch (name) {
        case 'Chemistry': {
            return 'che';
        }
        case 'Economics': {
            return 'eco';
        }
        case 'Literature': {
            return 'lit';
        }
        case 'Peace': {
            return 'pea';
        }
        case 'Physics': {
            return 'phy';
        }
        case 'Medicine': {
            return 'med';
        }
        default: {
            //if user types in invalid response, return physics as a default
            return 'phy';
        }
    }
} 

function generateApiStringCategoryAndYear(category, year) {
    return API_BASE_URL + category + "/" + year;
}

/*Process the data and generate html elements */
function processData(data) {
    //remove any old spans holding search cards
    $("span").remove();
    $('.result-container').append($('<span/>').addClass('result-card'));
    const $newSpan = $('.result-card');
    
    //generate html elements

    // Check if no data was returned (certain years or current year) 
    if(!('laureates' in data[0])) {

        $newSpan.append($('<h2/>').addClass('card-category').text("No award was given that year."));    
    } else { //good data is returned, process it and make DOM elements
        $newSpan.append($('<h2/>').addClass('card-category').text(data[0].categoryFullName.en));
        $newSpan.append($('<h3./>').addClass('card-year').text(data[0].awardYear));
        /** up to 3 laureates may exist, need to loop through them */
        for(let i = 0; i < data[0].laureates.length; i++) {
            // a laureate may be an organization, need to check based on this
            if('orgName' in data[0].laureates[i]) {
                console.log('Laureate #' + i + ' is an organization')
                $newSpan.append($('<h3/>').addClass('card-name').text(data[0].laureates[i].orgName.en));
            } else {
                console.log('Laueate #' + i + ' is NOT an organization');
                $newSpan.append($('<h3/>').addClass('card-name').text(data[0].laureates[i].fullName.en));
            }
        }
        $newSpan.append($('<p/>').addClass('card-motivation').text(data[0].laureates[0].motivation.en));
        $newSpan.append($('<p/>').addClass('prize-amount').text('Prize Amount: ' + data[0].prizeAmount + ' kr'));
    }

    

}
