import React, { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
interface Props {
    cityList: string[];
    setCityList: Dispatch<SetStateAction<string[]>>
}

interface fetchedCityData {
    cityName: string;
    country: string
}


export function CityFinder({ cityList, setCityList }: Props) {


    const [city, setCity] = useState<string>("");
    const [searchResult, setSearchResult] = useState<fetchedCityData>({ cityName: "", country: "" });
    const [isSearching, setIsSearching] = useState<boolean>(true);
    const apiKey = "860170d7583a180f31943ee7f4307401";


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setCity(e.target.value);
    }

    function handleAddCity(searchResult: fetchedCityData): void {

        if (cityList.some(x => x.toLocaleLowerCase() === searchResult.cityName.toLocaleLowerCase())) {
            alert("You already have this city on the list");
            setCity("");

            return;

        } else if (searchResult.cityName === "") {

            return;

        } else {
            setCityList(prev => [searchResult.cityName, ...prev]);
            setCity("");
        }
    }

    async function handleCitySearch(cityToCheck: string) {
        let reponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityToCheck}&appid=${apiKey}&mode=JSON&units=metric`);
        if (reponse.status === 200) {
            let data = await reponse.json();
            setSearchResult({ cityName: data.name, country: data.sys.country })
        } else {
            setSearchResult({ cityName: "", country: "" });
        }
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleCitySearch(city);
            setTimeout(() => setIsSearching(false), 400)
        }, 700);

        if (city !== "") setIsSearching(true);

        return () => clearTimeout(debounce);
    }, [city])

    //TODO 
    // push styles from inline to CSS
    // simplify ternary operator

    return (
        <div className="finderInputs">
            <input
                onChange={(e) => handleInputChange(e)}
                value={city}
                placeholder="search city"
                type="text"
                autoComplete="off"
                className={isSearching ? "searchInput gray" :
                    searchResult.cityName === "" && city === "" ?
                    "searchInput black" :
                        searchResult.cityName !== "" ? "searchInput green" :
                        "searchInput red"}
            />
            {city !== "" && (
                <div id="searchResult" onClick={() => handleAddCity(searchResult)}>
                    {searchResult.cityName ? `${searchResult.cityName},${searchResult.country} - click to add to list` :
                        isSearching ? "searching" : "city not found"}
                </div>)}
        </div>
    )
}
