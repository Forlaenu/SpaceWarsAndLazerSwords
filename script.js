let fetchedData;
const select = document.getElementById('characterSelect');
const textbox = document.getElementById('textbox');
const userQuestion = document.getElementById('userQuestion');
const form = document.getElementById('inputForm')

document.addEventListener('DOMContentLoaded', getCharacterList)
// select.addEventListener('change', displayResults)


// function fetchData() {
//     fetch("https://www.swapi.tech/api/planets/1/")
//     .then(res => res.json())
//     .then(function(data){
//         fetchedData = data;
//         console.log(fetchedData)
//         let storedItem = JSON.stringify(fetchedData);
//         localStorage.setItem("tat", storedItem)
//     })
//     .catch(err => console.error(err))
// }

// let tat = JSON.parse(localStorage.getItem("tat"))
// console.log(tat)
// // for(item in tat.result.properties){
// //     console.log(item)
// // }
// for (const [key, value] of Object.entries(tat.result.properties)) {
//     console.log(key, value);
// }

function updateList(list){
    console.log("Parsing list")
    for(item of list){
        const option = document.createElement('option');
        const charName = item.name;
        option.value = item.url;
        option.innerHTML = charName;
        select.appendChild(option)
    }
}
function getCharacterList(){
    let characterList;
    fetch("https://www.swapi.tech/api/people/")
    .then(response => response.json())
    .then(function(data){ 
        // console.log(data)
        characterList = data.results;
        updateList(characterList)
    })
}
form.addEventListener('submit', function(event){
    event.preventDefault();
    // this gives us the API url for that character 
    let characterURL = select.value;
    let question = userQuestion.value;
    console.log(characterURL)
    fetch(`${characterURL}`)
    .then(response => response.json())
    .then(function(data){
        console.log("Fetched single character")
        // some long if checks for users questions
        if(question.includes("hair color")){
            if(data.result.properties.hair_color != "n/a"){
                textbox.innerHTML = `My hair color is ${data.result.properties.hair_color}`
            }
            else{
                textbox.innerHTML = "I don't have any hair!"
            }
        }
        if(question.includes("list details")){
            let characterText = `Name: ${data.result.properties.name}<br>
            Born: ${data.result.properties.birth_year}<br>
            Height: ${data.result.properties.height}<br>
            Weight: ${data.result.properties.mass}<br>
            Gender: ${data.result.properties.gender}<br>
            Eye Color: ${data.result.properties.eye_color}<br>
            Hair Color: ${data.result.properties.hair_color}<br>
            Skin Color: ${data.result.properties.skin_color}<br>
            Home World URL: ${data.result.properties.homeworld}<br>`
            textbox.innerHTML = characterText;
        }
        if(question.includes("eye color")){
            if(data.result.properties.eye_color != "n/a"){
                textbox.innerHTML = `My eye color is ${data.result.properties.hair_color}`
            }
            else{
                textbox.innerHTML = "I don't have any eyes!"
            }
        }
        if(question.includes("height")){
            if(data.result.properties.hair_color != "n/a"){
                textbox.innerHTML = `My height is ${data.result.properties.hair_color} units`
            }
            else{
                textbox.innerHTML = "I have no height"
            }
        }
        if(question.includes("home")){
            //new fetch request to grab home world name
            let homeURL = data.result.properties.homeworld;
            fetch(`${homeURL}`)
            .then(response => response.json())
            .then(function(data){
                if(data.result.properties.name != "n/a"){
                    textbox.innerHTML = `My home world is ${data.result.properties.name}`
                }
                else{
                    textbox.innerHTML = "I don't have a home"
                }
            })
        }




        
    })
    
})