const API_KEY = "7KKXH6MLCCV3XZGMGVHSL6NUR";

async function getWeatherData(location) {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`,
        { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    
    return data;
}

async function getWeatherInfo(location) {
    // get data and return processed
    const data = await getWeatherData(location);

    const weatherInfo = {
        "location" : data.resolvedAddress,
        "description": data.description,
        "current" :  {
            "condition" : data.currentConditions.conditions,
            "icon": data.currentConditions.icon,
            "temperature": data.currentConditions.temp,
            "precipprob": data.currentConditions.precipprob,
            "feelslike": data.currentConditions.feelslike,
            "uvindex": data.currentConditions.uvindex,
            "windspeed": data.currentConditions.windspeed,
            "winddir": data.currentConditions.winddir,
            "visibility": data.currentConditions.visibility,
            "humidity": data.currentConditions.humidity,
        }
    }

    return weatherInfo;
}


export async function loadInfo(location) {
    const info = await getWeatherInfo(location);

    // main > location, temp, icon, precip-prob
    const locInput = document.querySelector("input");
    const mainTemp = document.querySelector(".main.card p.temp");
    const precProb = document.querySelector(".main.card p.prec-prob");
    const mainIcon = document.querySelector(".main.card img");
    
    locInput.value = info.location;
    mainTemp.innerText = info.current.temperature;
    precProb.innerText = info.current.precipprob + "%";
    mainIcon.alt = info.current.icon;

    // desc
    const descP = document.querySelector(".desc p");
    descP.innerText = info.description;

    // info > feels like, uv index, wind, visibility, humidity
    const feelsLike = document.getElementById("feels-like");
    const uvIndex = document.getElementById("uv-index");
    const wind = document.getElementById("wind");
    const visibility = document.getElementById("visibility");
    const humidity = document.getElementById("humidity");

    feelsLike.innerText = info.current.feelslike;
    uvIndex.innerText = info.current.uvindex;
    wind.innerText = `${info.current.windspeed}kmph, ${info.current.winddir}\xB0`;
    visibility.innerText = info.current.visibility;
    humidity.innerText = info.current.humidity;

}