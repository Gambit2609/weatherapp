export interface WeatherData {
    main: Main;
    sys: Sys;
    name: string;
    requestTimestamp: string;
    dt: number;
    weather: Weather[];
    dayOrNight: string;
    coord: Coordinates;
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

  interface Coordinates{
    lon: number;
    lat: number;
  }