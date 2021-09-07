import React, { useState, useEffect } from 'react';

interface Props {
    selectedCity: string;
}

interface WeatherData {
    main: Main;
    sys: Sys;
    name: string;
    requestTimestamp: string;
    dt: number;
    weather: Weather[];
    dayOrNight: string;
}

interface Main {
    temp: number;
    pressure: number;
    humidity: number;
}

interface Sys {
    sunrise: number;
    sunset: number;
}

interface Weather {
    main: string;
    icon: string;
    description: string;
}

const weatherDataTemplate: WeatherData = {
    main: { temp: 0, pressure: 0, humidity: 0 },
    sys: { sunrise: 0, sunset: 0 },
    weather: [{ main: "", icon: "", description: "" }],
    name: "",
    requestTimestamp: "",
    dt: 0,
    dayOrNight: ""
}

export function WeatherBoard({ selectedCity }: Props) {

    const [weatherData, setWeatherData] = useState<WeatherData>(weatherDataTemplate);
    const apiKey = "860170d7583a180f31943ee7f4307401"

    useEffect(() => {
        getWeatherData(selectedCity);
        let timer = setInterval(() => getWeatherData(selectedCity), 10000);

        return () => clearTimeout(timer)
    }, [selectedCity]);
    

    async function getWeatherData(city: string) {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&mode=JSON&units=metric`)
        if (response.status === 200) {
            let data = await response.json();
            setWeatherData(prev => {
                let actualDate = new Date().toLocaleString();
                prev = { ...data, requestTimestamp: actualDate };

                return prev;
            });
        } else {
            console.log(`error ${response.status}`)
        }
    }


    function convertDate(dateInUnix: number): string {
        let unixInMiliseconds = new Date(dateInUnix * 1000);
        return unixInMiliseconds.toLocaleString(undefined, { hour: "numeric", minute: "numeric", second: "numeric" });
    }

    console.log(weatherData.weather[0].main)

    function setBackGroundImage(data:WeatherData):string {
        let pictureName = "default";
        if (data.weather[0].main === "Clear") pictureName = "clear";
        if (data.weather[0].main === "Clouds") pictureName = "clouds";
        if (data.weather[0].main === "Snow") pictureName = "snow";
        if (data.weather[0].main === "Rain") pictureName = "rain";
        if (data.weather[0].main === "Drizzle") pictureName = "drizzle";
        if (data.weather[0].main === "Thunderstorm") pictureName = "thunder";

        return pictureName;
    }

    console.log(weatherData)

    return (
        <>
            <div className="weatherBoard" style={{backgroundImage: `url(/Images/${setBackGroundImage(weatherData)}.jpg)`}}>
                <div>
                    {weatherData.name ? <h1>{weatherData.name}</h1> : ""}
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                    {weatherData.weather[0].description}
                </div>

                {weatherData.main.temp ? <p>Temperature: {`${Math.round(weatherData.main.temp)}°C`}</p> : ""}
                {weatherData.main.pressure ? <p>Pressure: {`${Math.round(weatherData.main.pressure)} hPa`}</p> : ""}
                {weatherData.main.humidity ? <p>Humidity: {`${Math.round(weatherData.main.humidity)}  %`}</p> : ""}
                {weatherData.sys.sunrise ?
                    <p>Sunrise: {convertDate(weatherData.sys.sunrise)}</p>
                    : ""}
                {weatherData.sys.sunset ?
                    <p>Sunset: {convertDate(weatherData.sys.sunset)}</p>
                    : ""}
                {weatherData.requestTimestamp ? <p>Last update: {weatherData.requestTimestamp}</p> : ""}
            </div>
        </>
    )
}
