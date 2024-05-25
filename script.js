'use strict';

let city = document.getElementById("city-name");
let country = document.getElementById("country");
let temp = document.getElementById("temp");
let description = document.getElementById("description");
let feelsLike = document.getElementById("feelsLike");
let min = document.getElementById("tempMin");
let max = document.getElementById("tempMax");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let img = document.querySelector(".img-container img");
let dateTime = document.getElementById("date-time");

let now = new Date();
const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",  
    timeStyle: "short",
}).format(now);

function implementData(data){
    document.querySelector('input').value='';
    dateTime.textContent = date;
    city.textContent= data.name;
    country.textContent= data.sys.country;
    temp.textContent= Math.trunc(data.main.temp);
    description.textContent= data.weather[0].description;
    feelsLike.textContent= Math.trunc(data.main.feels_like);
    min.textContent= Math.trunc(data.main.temp_min);
    max.textContent=  Math.trunc(data.main.temp_max);
    humidity.textContent= data.main.humidity;
    wind.textContent= data.wind.speed;
    let src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    img.src= src;
    document.querySelector('.responce').style.opacity = 1;
}

async function getWeather() {
    let city = document.getElementById("city").value;
    if(city){
        let url = `https://api.openweathermap.org/data/2.5/weather?appid=bbe7d4cf002908df2b1cf82e3d4a947e&units=metric&q=${city}`;
        let res = await fetch(url);
        console.log(res);
        if(res.status == 200){
            let data = await res.json();
            implementData(data);
        }else{
            invalidCity();
        }
    } else{
        invalidCity();
    }
}

async function getWeatherByChords(latitude, longitude){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}&appid=bbe7d4cf002908df2b1cf82e3d4a947e&units=metric`;
    let res = await fetch(url);
    if(res.status == 200){
        let data = await res.json();
        implementData(data);
    }
};

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition((position)=>{
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    getWeatherByChords(latitude, longitude)
}, ()=>{
    console.log('Could not get location');
})
}

function invalidCity() {
    let input = document.querySelector('input');
    input.classList.add('invalid-city');
    input.value='';
    setTimeout(()=>{
        input.classList.remove('invalid-city');
    }, 3000)
}


document.querySelector("#submit").addEventListener("click", getWeather);




