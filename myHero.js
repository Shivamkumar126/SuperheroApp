let heroInfo = document.getElementById("hero-info");
var comicInfo = document.getElementById("comics");
var eventInfo = document.getElementById("events");
var seriesInfo = document.getElementById("series");



function addComic() {
  console.log("visible");
  comicInfo.classList.add("visible");
  comicInfo.classList.remove("invisible");


  seriesInfo.classList.add("invisible");

  eventInfo.classList.add("invisible");
}

function addSeries() {
  console.log("visible");
  comicInfo.classList.add("invisible");

  seriesInfo.classList.add("visible");
  seriesInfo.classList.remove("invisible");


  eventInfo.classList.add("invisible");
}

function addEvents() {
  console.log("visible");
  comicInfo.classList.add("invisible");

  seriesInfo.classList.add("invisible");

  eventInfo.classList.add("visible");
  eventInfo.classList.remove("invisible");

}


// getting the id of the heros from the local storage and storing it in a array

var idarray = JSON.parse(localStorage.getItem("myhero"));

//function to show the details of the desired superhoero by fetching details through id of the character.

let html = "";



async function fetchHero() {
  for (let i = 0; i < idarray.length; i++) {
    let response = await fetch(`HTTPS://gateway.marvel.com/v1/public/characters?ts=1688233720739&apikey=1d3f2c7b6bc4a443bfd66614b109b53b&hash=c4406b6e3fdf1ce83a60f7febc29b823&id=${idarray[i]}`)
    let jData = await response.json()
    jData.data["results"].forEach((element) => {

      console.log(element);

      html += ` <div class=" hero-container">
        
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }" class="hero-image" alt="hero image">
          <div class="card-body">
            <h2 class="hero-title">${element.name}</h2>
            <p class="hero-description"><span class="description">Description : </span>${element.description ? `${element.description}` : "# Not Available"}</p>
            <button class="info_btn" onclick="addComic()">Comics (${element.comics.available})</button>

            <button class="info_btn" onclick="addSeries()">Series (${element.series.available})</button>

            <button class="info_btn" onclick="addEvents()">Events (${element.events.available})</button>
          
          </div>
        </div> 
       
        `;

    });


  };
};

async function fetchComicInfo() {
  for (let i = 0; i < idarray.length; i++) {
    let response = await fetch(`HTTPS://gateway.marvel.com/v1/public/characters?ts=1688233720739&apikey=1d3f2c7b6bc4a443bfd66614b109b53b&hash=c4406b6e3fdf1ce83a60f7febc29b823&id=${idarray[i]}`)
    let jData = await response.json()
    jData.data["results"].forEach((element) => {

      console.log(element);

      element.comics["items"].forEach((comic) => {
        comicInfo.innerHTML += `
        <div >
        <div class="card-body">
          <a href=${comic.resourceURI}  class="btn btn-primary listButton" >${comic.name}</a>

        
        </div>
      </div> 
        `
      })
      element.series["items"].forEach((series) => {
        seriesInfo.innerHTML += `
        <div >
        <div class="card-body">
          <a href=${series.resourceURI}  class="btn btn-primary listButton" >${series.name}</a>

        
        </div>
      </div> 
        `
      })
      element.events["items"].forEach((event) => {
        eventInfo.innerHTML += `
        <div >
        <div class="card-body">
          <a href=${event.resourceURI}  class="btn btn-primary listButton" >${event.name}</a>

        
        </div>
      </div> 
        `
      })

    });


  };
};
fetchHero();
fetchComicInfo();

setTimeout(() => {
  heroInfo.innerHTML = html;
}, 1000);