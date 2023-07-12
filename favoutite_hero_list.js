let favouriteHerosList = document.querySelector("#favourite-heros");

//function to show the details of the desired superhoero by fetching details through id of the character.

var arr = JSON.parse(localStorage.getItem("favourites"));

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

// function to show the list of favourite superheroes


async function fetchData() {
  for (let i = 0; i < arr.length; i++) {
    let response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1688233720739&apikey=1d3f2c7b6bc4a443bfd66614b109b53b&hash=c4406b6e3fdf1ce83a60f7febc29b823&id=${arr[i]}`)
    let jData = await response.json()
    jData.data["results"].forEach((element) => {
      favouriteHerosList.innerHTML += ` <div class="card "  style="width: 18rem;">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }" class="card-img-top" alt="hero image">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <a href="myHero.html" class="btn btn-primary" onclick="seeMore(${element.id})">See More</a>
           <button class="btn btn-primary" onclick="removeFromFavourite(${arr[i]})">remove</button>
          
          </div>
        </div> `;

    });


  };
};
fetchData();

// this function is used to give to remove the hero from the favourite list

function removeFromFavourite(id) {
  var index = arr.indexOf(id);
  console.log(index);
  arr.splice(index, 1);
  localStorage.setItem("favourites", JSON.stringify(arr));
  location.reload();
}

