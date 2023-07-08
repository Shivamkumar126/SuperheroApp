let showContainer = document.getElementById("show-container");
let button = document.getElementById("submit-button");
let listContainer = document.querySelector(".list");
let input = document.getElementById("input-box")
let searchForm = document.getElementById("search-form");
let favouriteHerosList = document.getElementById("favourite-list");
let favouriteButton = document.getElementById("favourite-button");

let public_key = "1d3f2c7b6bc4a443bfd66614b109b53b";
let hashVal = "c4406b6e3fdf1ce83a60f7febc29b823";
ts = 1688233720739;
let date = new Date();
console.log(date.getTime());

const getInputValue =( (e)=>{
  e.preventDefault();
  var searchText = input.value;
})

searchForm.addEventListener('submit', getInputValue);

const [timestamp, apikey, hashValue] = [ts, public_key, hashVal];

function removeElement(){
  listContainer.innerHTML = "";
}

function displayWord(word){
  input.value = word;
  removeElement();
}

input.addEventListener("keyup" , async()=>{
  removeElement();
  if(input.value.length < 2){
    return false;
  }

  let url = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  let response = await fetch(url);
  let jsonData = await response.json();

  jsonData.data["results"].forEach((heros)=>{
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
button.addEventListener("click", (getResult = async ()=>{
    if (input.value.trim().length < 1) {
        console.log("Invalid input");
    }
    listContainer.innerHTML = "";
    showContainer.innerHTML = "";
    
    var searchText =input.value;
    let url = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&name=${searchText}`;
    

    let response = await fetch(url);
    let jsonData = await response.json();

    jsonData.data["results"].forEach((element) => {
      
        showContainer.innerHTML = `
        <div class="card" style="width: 18rem;">
  <img src="${
    element.thumbnail["path"]+"."+ element.thumbnail["extension"]
  }" class="card-img-top" alt="hero image">
  <div class="card-body">
    <h5 class="card-title">${element.name}</h5>
    <p class="card-text">${element.description}</p>
    <a href="favourites.html" class="btn btn-primary">See More</a>
     <a href="" onclick="addToFavourite" id="favourite-button" class="btn btn-primary">Add to Favourite</a>
  
  </div>
</div>
        
        `
    })
}))



// favouriteButton.addEventListener('click', ()=>{
//   let heroList = document.createElement("ul");
//   heroList.innerHTML += `
//     <li>
//       <h5 class="card-title">${input.value.name}</h5>
//       <button>remove</button>
//     </li>
//   ` 
// })


window.onload = ()=>{
  getResult();
}
































// let url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=1d3f2c7b6bc4a443bfd66614b109b53b&hash=78b328b363a1756aef6ddc4accc12074";

// let  response = fetch(url);
// response.then((value)=>{
//     return value.json();
// }).then((heros)=>{
//     for(items in heros){
//     console.log((heros[items].results));
//     }
//     card_container.innerHTML += `
//     <div class="card" style="width: 18rem;">
//     <img src="..." class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${heros[1].name}</h5>
//       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//       <a href="#" class="btn btn-primary">Go somewhere</a>
//     </div>
//   </div`

// })

// function heroCard(){
//     let heros = response();
//     card_container.innerHTML = `
//     <div class="card" style="width: 18rem;">
//     <img src="..." class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${heros[search_input.value].name}</h5>
//       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//       <a href="#" class="btn btn-primary">Go somewhere</a>
//     </div>
//   </div>
//   `
// }

// search_button.addEventListener('click',heroCard);