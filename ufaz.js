let date = new Date()
let container = document.querySelector(".container")

function getWeekName(number) {
    switch (number) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        default:
            break;
    }
}
function getShortName(number) {
    switch (number) {
        case 0:
            return "Sun"
        case 1:
            return "Mon"
        case 2:
            return "Tue"
        case 3:
            return "Wed"
        case 4:
            return "Thu"
        case 5:
            return "Fri"
        case 6:
            return "Sat"
        default:
            break;
    }
}
function getMonthName(value) {
    switch (value) {
        case 0:
            return "January"
        case 1:
            return "February"
        case 2:
            return "March"
        case 3:
            return "April"
        case 4:
            return "May"
        case 5:
            return "June"
        case 6:
            return "July"
        case 7:
            return "August"
        case 8:
            return "September"
        case 9:
            return "October"
        case 10:
            return "November"
        case 11:
            return "December"
        default:
            break;
    }
}
function icon(description) {
    switch (description) {
        case "clear sky":
            return "image/clear_sky.png"
        case "scattered clouds":
        case "few clouds":
            return "image/clouds.png"
        case "broken clouds": 
        case "overcast clouds":
            return "image/broken_clouds.png"
        case "mist": 
        case "smoke": 
        case "haze": 
        case "fog": 
        case "dust": 
        case "sand":
            return "image/mist.png"
        case "light rain": 
        case "moderate rain": 
        case "heavy intensity rain":
        case "extreme rain": 
        case "shower rain":
            return "image/rain.png"
        case "snow": 
        case "light snow":  
        case "heavy snow": 
        case "rain and snow": 
        case "shower snow":
            return "image/snow.png"
        case "thunderstorm":
            return "image/thunder.png"
        default:
            break;
    }
}
function changeLocation() {
    location.reload();
}

async function getWeatherInfo(city) {
    container.innerHTML = ''
    let location = await fetch(`https://us1.locationiq.com/v1/search.php?key=pk.6071c5c3a9cb08816a0322571ed3bb53&q=${city}&format=json`).then(res=>res.json())
    let latitude = location[0].lat
    let longitude = location[0].lon
    let API_key = '0af45fbd1d79c94b85dd65511bc6c99b'
    let weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max&timezone=Europe%2FMoscow&forecast_days=7`).then(res=>res.json())
    let windy = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`).then(res=>res.json())
    let description = windy.weather[0].description
    
    // Blue Part
    let blue = document.createElement("div")
    blue.classList = "blue"
    blue.innerHTML =`
        <h1>${getWeekName(date.getDay())}</h1>
        <div class="month">${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}</div>
        <div class="city">${location[0].display_name}</div>
        <img src="${icon(description)}">
        <div class="degree">${weather.current.temperature_2m} ${weather.current_units.temperature_2m}</div>
        <div class="windy">${description}</div>
    `
    container.appendChild(blue)

    // Black Part
    let black = document.createElement("div")
    black.classList = "black"
    black.innerHTML =`
        <div class="sign">
            <div class="humidity">
                <div class="text">HUMIDITY</div>
                <div class="persent">${weather.current.relative_humidity_2m} ${weather.current_units.relative_humidity_2m}</div>
            </div>
            <div class="wind">
                <div class="text">WIND</div>
                <div class="persent">${weather.current.wind_speed_10m} ${weather.current_units.wind_speed_10m}</div>
            </div>
        </div>

        <!-- Weather of the days -->
        <div class="weather"></div>

        <!-- Button -->
        <div class="button">
            <button onclick="changeLocation()">Change location</button>
        </div>
    `
    container.appendChild(black)

    let weatherd = black.querySelector(".weather")
    for (let i = 1; i <= weather.daily.time.length; i++) {
        let card = document.createElement("div")
        if (i === 1) {
            card.classList.add("card", "special");
        } else {
            card.classList.add("card");
        }
        let ds = (date.getDay() + i) % 7
        card.innerHTML = `
            <i class="fa-solid fa-wind"></i>
            <div class="week">${getShortName(ds)}</div>
            <div class="degreeofWeek">${weather.daily.temperature_2m_max[i-1]} ${weather.daily_units.temperature_2m_max}</div>
        `
        weatherd.appendChild(card)
    }
}

let main = document.querySelector(".main")
let input = document.querySelector(".input")

function press(e) {
    if(e.key=='Enter') {
        setTimeout(function() {
            getWeatherInfo(input.value);
            main.innerHTML = ''
        }, 300)
    }
}
input.addEventListener("keypress", press)





