import React from 'react';
import { WeatherData } from "../DomainModel/weatherDataTemplate"
interface Props {
    weatherData: WeatherData;
}

export function WeatherBoard({ weatherData }: Props) {

    function convertDate(dateInUnix: number): string {
        let unixInMiliseconds = new Date(dateInUnix * 1000);
        return unixInMiliseconds.toLocaleString(undefined, { hour: "numeric", minute: "numeric", second: "numeric" });
    }

    function setBackGroundImage(data: WeatherData): string {
        let supportedWeatherTypes = ["Clear", "Clouds", "Snow", "Rain", "Drizzle", "Thunderstorm"];
        let actualWeatherCondition = supportedWeatherTypes.find(x => x === data.weather[0].main);

        return actualWeatherCondition ? actualWeatherCondition : "default"
    }
    console.log(setBackGroundImage(weatherData))
    return (
            <div className="weatherBoard" style={{ backgroundImage: `url(/Images/${setBackGroundImage(weatherData)}.jpg)` }}>
                <div>
                    {weatherData.name && <h1>{weatherData.name}</h1>}
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                    {weatherData.weather[0].description}
                </div>
                {weatherData.main.temp && <p>Temperature: {`${Math.round(weatherData.main.temp)}°C`}</p>}
                {weatherData.main.pressure && <p>Pressure: {`${Math.round(weatherData.main.pressure)} hPa`}</p>}
                {weatherData.main.humidity && <p>Humidity: {`${Math.round(weatherData.main.humidity)}  %`}</p>}
                {weatherData.sys.sunrise && <p>Sunrise: {convertDate(weatherData.sys.sunrise)}</p>}
                {weatherData.sys.sunset && <p>Sunset: {convertDate(weatherData.sys.sunset)}</p>}
                {weatherData.requestTimestamp && <p>Last update: {weatherData.requestTimestamp}</p>}
            </div>
    )
}
