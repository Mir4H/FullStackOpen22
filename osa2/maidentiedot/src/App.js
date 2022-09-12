import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ search, handleChange }) => <div>Find countries: <input value={search} onChange={handleChange}/></div>

const SomeMatches = ({ countries, handleChange }) => (
<div>
  {countries.map((country) => (
  <p key={country.name.common}>{country.name.common} <button value={country.name.common} onClick={handleChange}>Select</button></p>))}
</div>
)

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const address = `https://api.openweathermap.org/data/2.5/weather?q=${country.name.common.toLowerCase()}&appid=${api_key}`
  console.log(address)
useEffect(() => {
  axios
    .get(address)
    .then(response => {
      setWeather(response.data)
  console.log(weather)
}).catch((error) =>
	console.error(error))
}, [address])

  console.log(weather)
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
    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    <p>Wind {weather.wind.speed.toFixed(2)} m/s</p></>}
  </div>
)}

const Countries = ({ search, countries, handleChange }) => {
  const filteredCountries = search === "" ? [] : countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))

  if (filteredCountries.length === 0) return <div><p>Search by typing a name of a country</p></div>
  if (filteredCountries.length > 10) return <div><p>Too many matches, specify another filter</p></div>
  if (filteredCountries.length === 1) return <ShowCountry country={filteredCountries[0]}/>
  return <SomeMatches countries={filteredCountries} handleChange={handleChange}/>
  }

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNameFilter = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>Countries of the world</h1>
      <Filter search={search} handleChange={handleNameFilter}/>
      <Countries countries={countries} search={search} handleChange={handleNameFilter}/>
    </div>
  )
}

export default App