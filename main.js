//Ex1
//A.
// 1) Create a function called getData() that returns a new promise.
// 2) The promise must resolve itself 2 seconds after the function is called  
// (google it!) and should return “hello world” in the data.
// 3) Create a second function called processData() that is asynchronous.
// 4) Inside the processData() function, use the await keyword to get the data from the getData() promise.
// 5) Console.log() the returned data to the console.

// const getData =() =>{
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {resolve('hello world')},2000);
//     })
// };

// const processData = async ()=>{
//    const answer = await getData();
//    console.log(answer);
// };

// processData();

//B.
// 1) Define a function named myFunction() that takes in a single     
// parameter called data. Inside the function, return a new promise.
// 2) Inside the promise, check if the data parameter is a number. 
// If the data parameter is not a number, return an error with a text you want.
// 3) If the data parameter is a number, check if it is even or odd. If the data parameter is even,
//  delay the resolution of the promise by 2 seconds and return the string 'even'.
// 4) If the data parameter is odd, delay the resolution of the promise by 1 second
// and return the string 'odd'.

// const myFunction = (data) =>{
//     return new Promise((resolve, reject) => {
//         if(typeof data ==='number'){
//             if(data%2===0){
//                 setTimeout(() => {resolve('even')},2000);
//             }else{
//                 setTimeout(() => {resolve('odd')},1000);
//             }
//         }else{
//             reject('data is not a number');
//         }
//     })
// }

// console.log(myFunction(3));


//Ex2
// In this task we will practice html requests from an external API.
// Your challenge is to integrate with the REST Countries API 
// https://restcountries.com/v2/all to pull country data and display it in a card (example down below).
// Explore https://restcountries.com
// In this task you will need to create a card for each country with the following information:
// Name,
// Capital,
// Country's flag image,
// Population number,
// Region

const CountriesGrid = document.getElementById('Countries-grid');
const searchBar = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const selectRegion = document.getElementById('region');

async function getCountries() {
    try {
      const countriesDataObj = await axios.get(
        "https://restcountries.com/v2/all"
      );
      const countriesData = countriesDataObj.data.map(country =>{
        return{
          flag: country.flag,
          name: country.name,
          population: country.population,
          region: country.region,
          capital: country.capital
        };
    });
    return countriesData;
    } catch (err) {
        console.error(err);
    }
  }
      
      getCountries()
      .then((countriesData) => {
        countriesData.forEach(element => {
          const countryCard = document.createElement('div');
          countryCard.className='country-card';
          for(const [key,value] of Object.entries(element)){
            if(key==='flag'){
              const img = document.createElement('img');
              img.src= value
              countryCard.appendChild(img);
            }else{
              const div = document.createElement('div');
              if(key==='name'){
                div.innerHTML = `${value}`;
              }else{                
                div.innerHTML = `<span>${key}</span> : ${value}`;
              }
              div.className = `${key}`;
              countryCard.appendChild(div);
            }
            }
            CountriesGrid.appendChild(countryCard);
          })
        })
      .catch((error) => {
          console.error(error);
        });


searchButton.addEventListener('click',()=>{
  const filter = searchBar.value.toUpperCase();
  const card = CountriesGrid.getElementsByClassName('country-card');
  for (i = 0; i < card.length; i++) {
    const a = card[i].children[1];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
});

selectRegion.addEventListener('change',(event)=>{
  const filter =event.target.value;
  const card = CountriesGrid.getElementsByClassName('country-card');
  for (i = 0; i < card.length; i++) {
    const a = card[i].children[3];
    txtValue = a.textContent || a.innerText;
    if (txtValue.includes(filter)) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
});