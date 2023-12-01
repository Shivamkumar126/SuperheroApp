let herosList = document.getElementById("heros-list")
let showContainer = document.getElementById("show-container");
let button = document.getElementById("submit-button");
let listContainer = document.querySelector(".list");
let input = document.getElementById("input-box")
let searchForm = document.getElementById("search-form");

let public_key = "1d3f2c7b6bc4a443bfd66614b109b53b";
let hashVal = "c4406b6e3fdf1ce83a60f7febc29b823";
ts = 1688233720739;
let date = new Date();
console.log(date.getTime());

const [timestamp, apikey, hashValue] = [ts, public_key, hashVal];



if (localStorage.getItem("myhero") == null) {
  localStorage.setItem("myhero", JSON.stringify([]));
} else {

  var myHeroId = JSON.parse(localStorage.getItem("myhero"));

}

// function used to add character id in myhero key in 
function seeMore(id) {
  for (let i = 0; i < myHeroId.length; i++) {
    myHeroId.pop();
  }
  myHeroId.push(id);
  localStorage.setItem("myhero", JSON.stringify(myHeroId));
}

// make a favourites key for storing all favourites hero's id in local storage if not available
if (localStorage.getItem("favourites") == null) {
  localStorage.setItem("favourites", JSON.stringify([]));
} else {
  var arr = JSON.parse(localStorage.getItem("favourites"));
}


// function for adding id value in local storage 
function addFavourite(id , favourite) {
  if (!arr.includes(id) == true) {
    arr.push(id);
    localStorage.setItem("favourites", JSON.stringify(arr));
    alert("Hero is added to your favourite heros")
  } else {
    alert("This hero is already existed in your list")
  }
 if(favourite){
  let icon = document.getElementsByClassName("icon");
  console.log(id);
  icon.classList.add(".red_heart")
 }

  
}

// function to show list of favourite superheroes...
async function showHerosList() {
  let url = `HTTPS://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&limit=100`;


  let response = await fetch(url);
  let jsonData = await response.json();
  console.log(jsonData);

  jsonData.data["results"].forEach((element) => {
    herosList.innerHTML += `
    <div class="card l" style="width: 18rem;">
 
      <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
      }" class="card-img-top" alt="hero image">
      <div class="card-body ">
        <h5 class="card-title">${element.name}</h5>
       
    <a href="myHero.html"  class="btn btn-primary listButton" onclick="seeMore(${element.id})">See More</a>
    <a data-href="favourites.html"  id="favourite-button" class="btn btn-primary listButton" target="_blank" onclick="addFavourite(${element.id},true)">Add to Favourite</a>
      
      </div>
    </div>
    `

  })
}

showHerosList();



const getInputValue = ((e) => {
  e.preventDefault();
  var searchText = input.value;
})

searchForm.addEventListener('submit', getInputValue);


function removeElement() {
  listContainer.innerHTML = "";
}

function displayWord(word) {
  input.value = word;
  removeElement();
}

// here we are autocompletimg the name of the superheroes 
input.addEventListener("keyup", async () => {
  removeElement();
  if (input.value.length < 2) {
    return false;
  }

  let url = `HTTPS://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  let response = await fetch(url);
  let jsonData = await response.json();

  jsonData.data["results"].forEach((heros) => {
    let name = heros.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWord('" + name + "')");
    let word = name.substr(0, input.value.length);
    word += name.substr(input.value.length);
    div.innerHTML = `<p>${word}</p>`;
    listContainer.appendChild(div);
  })

})

// here we are fetching the search from the api

button.addEventListener("click", (getResult = async () => {
  if (input.value.trim().length < 1) {
    console.log("Invalid input");
  }
  listContainer.innerHTML = "";
  showContainer.innerHTML = "";

  var searchText = input.value;
  let url = `HTTPS://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&name=${searchText}`;


  let response = await fetch(url);
  let jsonData = await response.json();

  jsonData.data["results"].forEach((element) => {

    showContainer.innerHTML = `
        <div class="card" style="width: 18rem;">
  <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
      }" class="card-img-top" alt="hero image">
  <div class="card-body">
    <h5 class="card-title">${element.name}</h5>
    <a href="myHero.html" class="btn btn-primary" onclick="seeMore(${element.id})">See More</a>
     <a data-href="favourites.html"  id="favourite-button" class="btn btn-primary" target="_blank" onclick="addFavourite(${element.id})">Add to Favourite</a>
     
  
  </div>
</div>
        
        `
  })
}))

