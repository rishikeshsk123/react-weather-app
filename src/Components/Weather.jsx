import React,{useState} from 'react'
import axios from 'axios';
// import { API_KEY } from '../constants'
import './Weather.css'

function Weather() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  
    const [city, setCity] = useState("")
    const [weatherData, setWeatherData] = useState([])
    const handleChange = (event)=>{
        setCity(event.target.value)
        // console.log(event.target.value);
    }
    
    const handleClick = event => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then((res)=>{
            setWeatherData(res.data)
            console.log(res.data);
          })
          setCity('')
          event.preventDefault();
        };
        // const imageUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        // console.log(imageUrl);
  return (
    <section className="vh-100">
  <div className="container py-5 h-100">

    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-8 col-lg-6 col-xl-4">

        <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

        <div className="input-group rounded mb-3">
          <input
            onChange={handleChange}
            value={city}
            type="search" 
            className="form-control rounded" 
            placeholder="City" 
            aria-label="Search"
            aria-describedby="search-addon" 
            />
          
            <button onClick={handleClick} className="input-group-text border-0 fw-bold" id="search-addon">
              Check!
            </button>
          
        </div>


        {typeof weatherData.main === 'undefined'?
        (<h4>Welcome to weather app!</h4>) :
        (<div className="card shadow-0 card-detail">
          <div className="card-body p-4">

            <h4 className="mb-1 sfw-normal">{weatherData.name}, {weatherData.sys.country}</h4>
            <p className="mb-2">Current temperature: <strong>{weatherData.main.temp}°F</strong></p>
            <p>Feels like: <strong>{weatherData.main.feels_like}°F</strong></p>
            <p>Max: <strong>{weatherData.main.temp_max}°F</strong>, Min: <strong>{weatherData.main.temp_min}°F</strong></p>

            <div className="d-flex flex-row align-items-center">
              <p className="mb-0 me-4">{weatherData.weather[0].description}</p>
              <i className="fas fa-cloud fa-3x" style={{color: "#eee"}}></i> 
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
            </div>

          </div>
        </div>)}

      </div>
    </div>

  </div>
</section>
  )
}

export default Weather