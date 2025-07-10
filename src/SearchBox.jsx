import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./SearchBox.css";
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [err, setErr] = useState(false);
    const [open, setOpen] = useState(false);
    const [isCelsius, setIsCelsius] = useState(true);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "7937102b98d1c14585c6392eb248e069";

    const getWeatherInfo = async () => {
        let jsonRes;
        try {
            let units = isCelsius ? 'metric' : 'imperial';
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=${units}`);
            jsonRes = await response.json();
            console.log(jsonRes);
            let result = {
                city: city,
                temp: jsonRes.main.temp,
                tempMin: jsonRes.main.temp_min,
                tempMax: jsonRes.main.temp_max,
                humidity: jsonRes.main.humidity,
                feelsLike: jsonRes.main.feels_like,
                weather: jsonRes.weather[0].description,
                wind: jsonRes.wind.speed,
                pressure: jsonRes.main.pressure,
                sunrise: jsonRes.sys.sunrise,
                sunset: jsonRes.sys.sunset,
                aqi: Math.floor(Math.random() * 5) + 1,
            };
            return result;
            
        } catch (err) {
            throw err;
        }
       
    };

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
            setErr(false);
            setOpen(false);
        } catch (err) {
            setErr(true);
            setOpen(true);
        }
    };

    const handleLocationClick = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            try {
                let units = isCelsius ? 'metric' : 'imperial';
                let response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
                let jsonRes = await response.json();
                 console.log("Weather API Response:", jsonRes); // debug
                let result = {
                    city: jsonRes.name,
                    temp: jsonRes.main.temp,
                    tempMin: jsonRes.main.temp_min,
                    tempMax: jsonRes.main.temp_max,
                    humidity: jsonRes.main.humidity,
                    feelsLike: jsonRes.main.feels_like,
                    weather: jsonRes.weather[0].description,
                    wind: jsonRes.wind.speed,
                    pressure: jsonRes.main.pressure,
                    sunrise: jsonRes.sys.sunrise,
                    sunset: jsonRes.sys.sunset,
                    aqi: Math.floor(Math.random() * 5) + 1,
                };
                updateInfo(result);
            } catch {
                setErr(true);
                setOpen(true);
            }
        });
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <TextField
                    className="customInput"
                    label="Enter a city"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <IconButton 
                    onClick={handleLocationClick}
                    sx={{
                        backgroundColor: "#fff",
                        color: "#3498db",
                        '&:hover': {
                            backgroundColor: "black",
                        },
                        width: 40,
                        height: 40
                    }}
                >
                    <LocationOnIcon />
                </IconButton>
                
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="No such place in our API"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </div>
    );
}
