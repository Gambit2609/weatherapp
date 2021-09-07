import React from 'react';
import { CityFinder } from './CityFinder';
import { CityList } from './CityList';
import { Dispatch,SetStateAction } from 'react';

interface Props {
    cityList: string[];
    setCityList: Dispatch<SetStateAction<string[]>>
    handleRemoveCity: (city:string)=> void;
    handleChangeSelectedCity: (city:string)=> void;
}

export function CitySelector({cityList, setCityList, handleRemoveCity, handleChangeSelectedCity}: Props) {

    return (
        <>
            <CityFinder cityList={cityList} setCityList={setCityList}/>
            <CityList cityList={cityList} handleRemoveCity={handleRemoveCity} handleChangeSelectedCity={handleChangeSelectedCity} />
        </>
    )
}
