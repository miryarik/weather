const API_KEY = "7KKXH6MLCCV3XZGMGVHSL6NUR";

async function getWeatherData(location) {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
        { mode: "cors" }
    );
    const data = await response.json();

    return data;
}

async function getWeatherInfo(location) {
    // get data and return processed
    const data = await getWeatherData(location);

    const weatherInfo = {
        location: data.resolvedAddress,
        description: data.description,
        current: {
            condition: data.currentConditions.conditions,
            icon: data.currentConditions.icon,
            temperature: data.currentConditions.temp,
            precipprob: data.currentConditions.precipprob,
            feelslike: data.currentConditions.feelslike,
            uvindex: data.currentConditions.uvindex,
            windspeed: data.currentConditions.windspeed,
            winddir: data.currentConditions.winddir,
            visibility: data.currentConditions.visibility,
            humidity: data.currentConditions.humidity,
        },
        week: data.days.slice(1, 7).map((day) => {
            return {
                icon: day.icon,
                temperature: day.temp,
            };
        }),
    };

    return weatherInfo;
}

export async function loadInfo(location) {
    spinner(true);
    const info = await getWeatherInfo(location);
    spinner(false);

    // main > location, temp, icon, precip-prob
    const locInput = document.querySelector("input");
    const mainTemp = document.querySelector(".main.card p.temp");
    const precProb = document.querySelector(".main.card p.prec-prob");
    const mainIcon = document.querySelector(".main.card img");

    locInput.value = info.location;
    precProb.innerText = info.current.precipprob + "%";

    mainTemp.innerText = info.current.temperature;
    const span = document.createElement("span");
    span.innerText = "Celsius";
    mainTemp.appendChild(span);

    import(`../images/${info.current.icon}.svg`)
        .then((module) => {
            mainIcon.src = module.default;
        })
        .catch((err) => console.error("Icon load failed"));

    // desc
    const descP = document.querySelector(".desc p");
    descP.innerText = info.description;

    // info > feels like, uv index, wind, visibility, humidity
    const feelsLike = document.getElementById("feels-like");
    const uvIndex = document.getElementById("uv-index");
    const windSpeed = document.getElementById("windspeed");
    const windDir = document.getElementById("winddir");
    const visibility = document.getElementById("visibility");
    const humidity = document.getElementById("humidity");

    feelsLike.innerText = `${info.current.feelslike}\xB0 C`;
    uvIndex.innerText = info.current.uvindex;
    windSpeed.innerText = `${info.current.windspeed} kmph`;
    windDir.innerText = `${info.current.winddir}\xB0`;
    visibility.innerText = `${info.current.visibility} km`;
    humidity.innerText = `${info.current.humidity}%`;

    // week > for each day => date, icon, temp
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date().getDay();
    const week = document.querySelectorAll(".section.week > div");

    for (let i = 0; i < week.length; i++) {
        week[i].querySelector("p.day").innerText = days[(today + i) % 7];

        import(`../images/${info.week[i].icon}.svg`)
            .then((module) => {
                week[i].querySelector("img").src = module.default;
            })
            .catch((err) => console.error("Icon load failed"));

        week[i].querySelector("p.temp").innerText = info.week[i].temperature;
    }
}

export function spinner(isOn) {
    if (isOn) {
        document.querySelector("dialog").showModal();
    } else {
        document.querySelector("dialog").close();
    }
}
