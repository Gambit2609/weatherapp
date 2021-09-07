import React, { useEffect, useState } from 'react';
import './Styles/style.css';
import { CitySelector } from './Components/CitySelector';
import { WeatherBoard } from './Components/WeatherBoard';

function App() {

  const [selectedCity, setSelectedCity] = useState<string>("Krakow");
  const [cityList, setCityList] = useState<string[]>(["Krakow"]);

  function handleRemoveCity(city: string): void {
    setCityList(prev => prev.filter(x => x !== city));
  }

  function handleChangeSelectedCity(city: string) {
    setSelectedCity(city)
  }

  useEffect(()=>setSelectedCity(cityList[0]) ,[cityList])



  return (
    <div className="appBody" style={{backgroundImage: `url(/Images/mainBackground.jpg)`}}>
      <div className="citySelector">
        <CitySelector
          cityList={cityList}
          setCityList={setCityList}
          handleRemoveCity={handleRemoveCity}
          handleChangeSelectedCity={handleChangeSelectedCity}
        />
      </div>
      <div>
        <WeatherBoard selectedCity={selectedCity} />
      </div>

    </div>
  );
}

export default App;
