import React, { useEffect, useState } from 'react';
import './Styles/style.css';
import { CitySelector } from './Components/CitySelector';
import { WeatherBoard } from './Components/WeatherBoard';
import { MapboxBackground } from './MapboxBackground';
import { WeatherData } from "./DomainModel/weatherDataTemplate";


const weatherDataTemplate: WeatherData = {
  main: { temp: 0, pressure: 0, humidity: 0 },
  sys: { sunrise: 0, sunset: 0 },
  weather: [{ main: "", icon: "", description: "" }],
  name: "",
  requestTimestamp: "",
  dt: 0,
  dayOrNight: "",
  coord: { lon: 19.9167, lat: 50.0833 }
}

const apiKey = "860170d7583a180f31943ee7f4307401"

function App() {

  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState<string[]>(getCitiesFromLocalStorage);
  const [weatherData, setWeatherData] = useState<WeatherData>(weatherDataTemplate);
  const [viewportSettings, setViewportSettings] = useState({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 1
  });

  function getCitiesFromLocalStorage():string[]{
    let citiesFromLocalStorage = localStorage.getItem("cities");

    return citiesFromLocalStorage ? JSON.parse(citiesFromLocalStorage) : [];
  }

  function handleRemoveCity(city: string): void {
    setCities(prev => prev.filter(x => x !== city));
  }

  function handleChangeSelectedCity(city: string) {
    setSelectedCity(city)
  }

  useEffect(() => {
    setSelectedCity(cities[0]);
    localStorage.setItem("cities", JSON.stringify(cities));
  },[cities]);

  useEffect(() => {
    getWeatherData(selectedCity);
    let timer = setInterval(() => getWeatherData(selectedCity), 10000);

    return () => clearTimeout(timer)
  }, [selectedCity]);

  useEffect(() => {
    setViewportSettings(prev => ({ ...prev, latitude: weatherData.coord.lat, longitude: weatherData.coord.lon, zoom: 11 }))

  }, [weatherData])


  async function getWeatherData(city: string) {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&mode=JSON&units=metric`)

    if (response.status === 200) {
      let data = await response.json();
      setWeatherData(prev => {
        let actualDate = new Date().toLocaleString();
        prev = { ...data, requestTimestamp: actualDate };

        return prev;
      });
    }
  }

  return (
    <div className="appBody">
      <div className="citySelector">
        <CitySelector
          cityList={cities}
          setCityList={setCities}
          handleRemoveCity={handleRemoveCity}
          handleChangeSelectedCity={handleChangeSelectedCity}
        />
      </div>
      {cities.length &&
        <div className="weatherBoardMain">
          <WeatherBoard
            weatherData={weatherData}
          />
        </div>}
      <div className="mapboxBackground">
        <MapboxBackground viewport={viewportSettings} />
      </div>
    </div>
  );
}

export default App;
