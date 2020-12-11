// Min URL variabel.
const url = 'https://restcountries.eu/rest/v2/all';

// Nodelist med alla mina h3.
let allH3 = document.querySelectorAll('h3');

// Fetch anropet med url variabeln.
fetch(url)
.then(res => res.json())
.then(data => {
    console.log(data);
    
    // Nodelists med mina image element och h1 element.
    let images = document.querySelectorAll('img');
    let names = document.querySelectorAll('h1');

    // Array för alla mina instanser.
    let countries = [];

    // For loop som fyller min countries array med instanser.
    for(let i=0;i<images.length;i++){
        let randNum = Math.floor(Math.random()*data.length);

        countries[i] = new Country(data[randNum].name, data[randNum].flag, data[randNum].timezones);
    }
    
    // For loop som ger mina image och h1 element innehåll.
    for(let i=0;i<countries.length;i++){
        images[i].src = countries[i].flag;
        names[i].innerText = countries[i].name;

    }

    // for loop som anropar instans metoden i varje instans.
    for(let i=0; i<allH3.length;i++){
            countries[i].time(allH3[i]);
    }

})

// Constructor till countries
function Country(name, flag, timezones){
    this.name = name;
    this.flag = flag;
    this.timezones = timezones;
}

// Instans metoden för min constructor
Country.prototype.time = function(h3){
    
    let clock = new Date();
    
    // variabel med landets utctimme i string
    let timeNum = this.timezones[0].substr(4,2);
    // Landets tidszons negativa eller positiva operator
    let timeOp = this.timezones[0].substr(3,1);
    console.log(timeOp);

    // If sats för att avgöra vilket resultat som returneras beroende på operatorn.
    if(timeOp === '+'){
        return h3.innerText = `The time in ${this.name} is 
        ${clock.getUTCHours()+parseInt(timeNum)} : ${clock.getMinutes()}`;// Parseint för att omvandla stringen till ett nummer.
    }else if(timeOp === '-'){
        if(clock.getUTCHours()-parseInt(timeNum) < 0){
            return h3.innerText = `The time in ${this.name} is 
            ${24-parseInt(timeNum)}:${clock.getMinutes()}`; // utgår från 24 som i klockan 12 och subtraherar utc tiden från det istället.
        }else{
            return h3.innerText = `The time in ${this.name} is
            ${clock.getUTCHours()-parseInt(timeNum)}:${clock.getMinutes()}`;
        }
    }else{
        return h3.innerText = `The time in ${this.name} is 
        ${clock.getUTCHours()}:${clock.getMinutes()}`;
    }
}
