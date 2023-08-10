var containerElement = document.getElementById("container");
var imageElement = document.getElementById("image");
console.log(imageElement)
var apikey= "3fac9c4542f5862f3d03f2f2eeaa889d";
var privateKey ="6d868d05aec6c88c95814518acad060827d78516";
var hashedValue = "dbd3fb9a458864dde50984bed11d004e";
var baseUri = "https://gateway.marvel.com/v1/public/characters";
var urlParams = new URLSearchParams(window.location.search);
var characterId = urlParams.get('id');
var charnameElement = document.getElementById("name");
var descElement  = document.getElementById("desc");
var comicsElement = document.getElementById("comics");
var eventsElement = document.getElementById("events");
var seriesElement = document.getElementById("series");
var storiesElement = document.getElementById("stories");
fetch(`${baseUri}/${characterId}?ts=3&apikey=${apikey}&hash=${hashedValue}`)
.then((response)=>{return response.json()})
.then((data)=>{
// containerElement.innerHTML=data;
let result = data.data.results[0];
imageElement.setAttribute("src",`${result.thumbnail.path}.${data.data.results[0].thumbnail.extension}`)
charnameElement.innerText = result.name;
if(result.description==="")
descElement.innerText = "no description found!";
else
descElement.innerText = data.data.results[0].description;

result.comics.items.length==0?comicsElement.innerHTML="<h3 class = 'nofound'>no comics found!</h3>":
result.comics.items.forEach((item)=>{
    comicsElement.innerHTML+=`<li> ${item.name} </li>`;
})

result.events.items.length==0?eventsElement.innerHTML="<h3 class = 'nofound'>no events found!</h3>":
result.events.items.forEach((item)=>{
    eventsElement.innerHTML+= `<li> ${item.name}</li>`
})


result.series.items.length==0?seriesElement.innerHTML="<h3 class = 'nofound'>no events found!</h3>":
result.series.items.forEach((item)=>{
    seriesElement.innerHTML+= `<li> ${item.name}</li>`
})

result.stories.items.length==0?storiesElement.innerHTML="<h3 class = 'nofound'>no events found!</h3>":
result.stories.items.forEach((item)=>{
    storiesElement.innerHTML+= `<li> ${item.name} </li>`
})
console.log(data);
})