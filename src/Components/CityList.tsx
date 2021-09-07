import React from 'react';

interface Props {
    cityList: string[];
    handleRemoveCity: (city: string) => void;
    handleChangeSelectedCity: (city: string) => void;
}

export function CityList({ cityList, handleRemoveCity, handleChangeSelectedCity }: Props) {

    return (
        <>
            <ul>
                {cityList.map(city =>
                    <li key={city} className="listedCity" onClick={() => handleChangeSelectedCity(city)}>
                        <div className="displayedCity">
                            {city}
                            </div>
                        <img
                            alt="delete"
                            onClick={() => handleRemoveCity(city)}
                            className="removeCity"
                            src="/Images/trash.png"
                        >
                        </img>
                        <span className="tooltip infoShowWeather">Click on city name to display weather</span>
                        <span className="tooltip infoDeleteCity">Click to delete city</span>
                    </li>
                )}
            </ul>
        </>
    )
}
