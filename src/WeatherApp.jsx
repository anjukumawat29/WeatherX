import { useState } from 'react';
import SearchBox from './SearchBox';
import WeatherInfo from './WeatherInfo';

export default function WeatherApp(){
    let [weatherInfo, setWeatherInfo]= useState({
      city: "Mumbai",
      temp: 30,
      tempMin: 28,
      tempMax: 33,
      humidity: 75,
      feelsLike: 35,
      weather: "humid",
      wind: 8,
      pressure: 1005.1,
      sunrise: 1710453523,
      sunset: 1710497923,
      aqi: 3

    });

    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }

    const getBackgroundImage = () => {
    const condition = weatherInfo.weather.toLowerCase();
    const temp = weatherInfo.temp;
    const humidity = weatherInfo.humidity;

    if (humidity > 80)
        return "https://plus.unsplash.com/premium_photo-1740479189801-66a1488f2014?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHVtaWQlMjBmb2clMjB3ZWF0aGVyfGVufDB8fDB8fHww"; // humid & fog
    else if (temp > 35)
        return "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D"; // hot
    else if (temp < 10)
        return "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ludGVyfGVufDB8fDB8fHww"; // cold
    else if (condition.includes("cloud"))
        return "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3Ds"; // cloud
    else
        return "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D"; // default clear
};


    return (
        <div 
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${getBackgroundImage()})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "2rem"
            }}
        >
            <SearchBox updateInfo={updateInfo}/>
            <WeatherInfo info={weatherInfo}/>
        </div>
    );
}
