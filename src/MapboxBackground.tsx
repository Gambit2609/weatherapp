import React from 'react';
import ReactMapGL from 'react-map-gl';


interface CityViewport{
    width: string;
    height: string;
    latitude: number;
    longitude: number;
    zoom: number;
}

interface Props{
    viewport: CityViewport;
}

const accesToken = "pk.eyJ1Ijoia3J6eXNpZWsyNiIsImEiOiJja3Rha2MxaXcxbXhhMnZwZTRjM2llMnRiIn0.K9I7473tDLWyZQhfdPNYDA"

export function MapboxBackground({viewport: viewportSettings}: Props) {

    return (
        <ReactMapGL 
            {...viewportSettings}
            mapboxApiAccessToken={accesToken}
            mapStyle="mapbox://styles/krzysiek26/cktbc18cm7pvi17phqg88f5ij"
        >
        </ReactMapGL>
    )
}
