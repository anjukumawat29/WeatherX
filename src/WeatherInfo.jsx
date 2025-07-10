import './WeatherInfo.css'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import SpeedIcon from '@mui/icons-material/Speed';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';

export default function WeatherInfo({info}) {
    let weatherIcon;
    if (info.weather.includes("cloud")) 
        weatherIcon = <CloudIcon fontSize="large" style={{color: "#666"}} />;
    else if (info.weather.includes("rain")) 
        weatherIcon = <OpacityIcon fontSize="large" style={{color: "#3498db"}} />;
    else 
        weatherIcon = <WbSunnyIcon fontSize="large" style={{color: "#f39c12"}} />;

    return (
    <div className='InfoBox'>
        <div className="glassCard">
            <div className="topDetails">
                <div className="weatherIcon">{weatherIcon}</div>
                <h1>{info.city}</h1>
                <h2>{info.temp}°C</h2>
                <p>Feels like: {info.feelsLike}°C</p>
            </div>
            
            <div className="statsGrid">
                <div className="statBox"><AirIcon /> Wind: {info.wind} m/s</div>
                <div className="statBox"><OpacityIcon /> Humidity: {info.humidity}%</div>
                <div className="statBox"><DeviceThermostatIcon /> Min-Temp: {info.tempMin}°C</div>
                <div className="statBox"><DeviceThermostatIcon /> Max-Temp: {info.tempMax}°C</div>
                <div className="statBox"><SpeedIcon /> Pressure: {info.pressure} hPa</div>
                <div className="statBox"><WbCloudyIcon /> Weather: {info.weather}</div>
            </div>
        </div>
    </div>
    );
}
