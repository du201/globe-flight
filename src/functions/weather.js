import fetch from "node-fetch"

let lat = 33.44
let lon = -94.04
let API_key = "8eecd0fb86128334073e887977445e60"

async function getWeather(lat, lon, API_key) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,daily,alerts}&units=imperial&appid=${API_key}`);
    const data = await response.json()
    var json = {
        temperature: data.current.temp,
        humidity: data.current.humidity,
        wind: data.current.wind_speed,
        forecast: data.current.weather[0].main,
        timezone: data.timezone, 
        timezone_offset: data.timezone_offset
    }
    console.log(json);
    return json;
}

getWeather(lat, lon, API_key)