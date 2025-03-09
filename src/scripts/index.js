import "../styles/modern-reset.css";
import "../styles/styles.css";

const API_KEY = "7KKXH6MLCCV3XZGMGVHSL6NUR";

let location = "srinagar, kashmir";

async function getWeatherInfo(location) {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`,
        { mode: "cors" }
    );
    const data = await response.json();

    // console.log(data)

    const weatherInfo = {
        "location" : data.resolvedAddress,
        "description": data.description,
        "timezone": data.timezone,
        "current" :  {
            "condition" : data.currentConditions.conditions,
            "time": data.currentConditions.datetime,
            "temperature": data.currentConditions.temp,
            "feelslike": data.currentConditions.feelslike,
            "humidity": data.currentConditions.humidity,
            "precip": data.currentConditions.precip,
            "precipprob": data.currentConditions.precipprob,
            "preciptype": data.currentConditions.preciptype,
            "uvindex": data.currentConditions.uvindex,
            "visibility": data.currentConditions.visibility,
            "winddir": data.currentConditions.winddir,
            "windspeed": data.currentConditions.windspeed,
        }
    }

    return weatherInfo;
}

const info = await getWeatherInfo(location);
console.log(info);

