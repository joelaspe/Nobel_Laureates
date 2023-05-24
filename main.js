const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener('click', getData);

async function getData() {
    console.log('user clicked on the button');
    const response = await fetch('https://api.nobelprize.org/2.1/nobelPrizes');
    const data = await response.json();
    console.log(data);   
}

