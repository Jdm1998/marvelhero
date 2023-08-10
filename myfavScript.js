let heroes = localStorage.getItem("fav");

let favheroes = JSON.parse(heroes);


var apikey= "3fac9c4542f5862f3d03f2f2eeaa889d";
var privateKey ="6d868d05aec6c88c95814518acad060827d78516";
var hashedValue = "dbd3fb9a458864dde50984bed11d004e";
var baseUri = "https://gateway.marvel.com/v1/public/characters";
var baseUriKeys = `ts=3&apikey=${apikey}&hash=${"dbd3fb9a458864dde50984bed11d004e"}`
var contentElement = document.getElementById('content');



function addToFavorite(id){
    // event.preventDefault();
    console.log("in add to fav");
    id= parseInt(id);
    let heroes = localStorage.getItem("fav");
    let favheroes=JSON.parse(heroes);
    if(favheroes==null)
    favheroes=[id];
    else
    favheroes.push(id);
    localStorage.setItem("fav",JSON.stringify(favheroes));

    get();
}

function checkForfav(id){
    let heroes = localStorage.getItem("fav");
    let favheroes = JSON.parse(heroes);
    if(favheroes==null)
    return false;
    if(favheroes.includes(id))
    return true;
    return false;
}
function removeToFav(id){

    console.log("in remove from fav");
    let heroes = localStorage.getItem("fav");
    let favheroes = JSON.parse(heroes);
        favheroes=favheroes.filter((ele)=>{return ele!=id});
    localStorage.setItem('fav',JSON.stringify(favheroes));
    get();   
}

 function get(){

    var htmlElements="";

favheroes.forEach(async (hero)=>{
    await fetch(`${baseUri}/${hero}?${baseUriKeys}`)
    .then((Response)=>Response.json())
    .then(data => {
        console.log(data)
    var res = data.data.results[0];
       
           htmlElements += ` <div class="herocontainer" >
           <a href='./character.html?id=${res.id}'>
           <img class="heroimg" src=${res.thumbnail.path+"."+res.thumbnail.extension} alt="">
           <h4>${res.name}</h4>
           <p> ${res.description==""?"no description found!":res.description}</p>
           </a>
          <div class="favorite">
           <button heroId=${res.id} onclick="handler(event)">${checkForfav(res.id)?'remove from favorite':'add to favorite'}</button>
           </div>
       </div>`
       

})
contentElement.innerHTML = htmlElements;

})
    

}

get();
