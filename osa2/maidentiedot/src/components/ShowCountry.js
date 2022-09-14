import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY
    const capital = country.capital[0].toLowerCase()
    const address = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
  
    useEffect(() => {
      axios
        .get(address)
        .then(response => {
          setWeather(response.data)
      }).catch((error) =>
          console.error(error))
    }, [address])
  
    return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}<br/>Area: {country.area}</p>
      <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
      <img alt={country.name.common} src={country.flags.png}/>
      {!weather ? <h4>No weather information available for {country.capital} at the moment</h4> : <><h3>Weather in {country.capital}</h3>
      <p>Temperature {(weather.main.temp-273.15).toFixed(2)} Celcius</p>
      <img alt={weather.weather[0].icon} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <p>Wind {weather.wind.speed.toFixed(2)} m/s</p></>}
    </div>
  )}

export default ShowCountry