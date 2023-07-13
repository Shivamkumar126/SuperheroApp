let heroInfo = document.getElementById("hero-info");

// getting the id of the heros from the local storage and storing it in a array

var idarray = JSON.parse(localStorage.getItem("myhero"));

//function to show the details of the desired superhoero by fetching details through id of the character.

let html="";

async function  fetchHero(){
    for (let i = 0; i < idarray.length; i++) {
     let response = await fetch(`HTTPS://gateway.marvel.com/v1/public/characters?ts=1688233720739&apikey=1d3f2c7b6bc4a443bfd66614b109b53b&hash=c4406b6e3fdf1ce83a60f7febc29b823&id=${idarray[i]}`)
     let jData = await response.json()
        jData.data["results"].forEach((element) => {

        html += ` <div id="about-hero-container">
          <img src="${
            element.thumbnail["path"]+"."+ element.thumbnail["extension"]
          }" class="hero-image" alt="hero image">
          <div class="card-body">
            <h2 class="hero-title">${element.name}</h2>
            <p class="hero-description">${element.description}</p>
          
          </div>
        </div> `;
          
        });

      
    };
};
fetchHero();

setTimeout(() => {
  heroInfo.innerHTML=html;
}, 1000);