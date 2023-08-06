
// var md5 = require("crypto-js/md5");


// var contents =document.getElementById("content");
var apikey= "3fac9c4542f5862f3d03f2f2eeaa889d";
var privateKey ="6d868d05aec6c88c95814518acad060827d78516";
var hashedValue = "dbd3fb9a458864dde50984bed11d004e";
var baseUri = "http://gateway.marvel.com/v1/public/characters";
var contentElement = document.getElementById('content');

// var hashed = md5(`3${privateKey}${apikey}`);
// console.log(hashed.toString());


var url = `http://gateway.marvel.com/v1/public/characters?limit=12&ts=3&apikey=${apikey}&hash=${"dbd3fb9a458864dde50984bed11d004e"}`
// var url = "https://gateway.marvel.com:443/v1/public/characters?limit=1&apikey=3fac9c4542f5862f3d03f2f2eeaa889d"


function addToFavorite(id){
    // event.preventDefault();
    console.log("in add to fav");
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
    
    let heroes = localStorage.getItem("fav");
    let favheroes = JSON.parse(heroes);
        favheroes=favheroes.filter((ele)=>{return ele!=id});
    localStorage.setItem('fav',JSON.stringify(favheroes));
    get()
}

function handler(event){
    console.log(event);
    // if(event.firstchild.data=="add to favorite")
    // addToFavorite(id);
    // else
    // removeToFav(id);
}
var get =async function  (){
    fetch(url)
    .then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data.data?.results);
        var results = data.data.results;
        var htmlElements="";
        results.forEach(res => {
           htmlElements += ` <div class="herocontainer" ><a href='./character.html?id=${res.id}'>
           <img class="heroimg" src=${res.thumbnail.path+"."+res.thumbnail.extension} alt=""></a>
           <h4>${res.name}</h4>
           <p> ${res.description==""?"no description found!":res.description}</p>
          <div class="favorite">
           <button onclick="handler(event)">${checkForfav(res.id)?'remove from favorite':'add to favorite'}</button>
           </div>
       </div>
       
   `
        });
        contentElement.innerHTML=htmlElements;
        
    })
    
    // console.log(res.body);
}

get();

let searchElement = document.getElementById("name");
let searchResultElement = document.getElementById("searchresult");
var timer ;
var srcResultlist= "";

var suggestion = function(event){
    clearInterval(timer);
     timer = setInterval(()=>{
        
        
        srcResultlist="";
        console.log("called");
        fetch(`${baseUri}?nameStartsWith=${event.target.value}&ts=3&apikey=${apikey}&hash=${hashedValue}`)
        .then((res)=>{ return res.json()})
        .then((data)=>{let results = data.data.results;
                results.forEach((ele,index)=>{
                    console.log(ele.name,index);
                    if(index<10)
                    srcResultlist+=`<div class="searcheditem">${ele.name}</div>`
                })})
        .then(()=>{searchResultElement.innerHTML=srcResultlist})
    },2000);
    console.log(event.target.value,"event");

}
searchElement.addEventListener("keyup",suggestion);



function characterPage(){
    
}

