import SomeMatches from './SomeMatches'
import ShowCountry from './ShowCountry'

const Countries = ({ search, countries, handleChange }) => {
    const filteredCountries = search === "" ? [] : countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
  
    if (filteredCountries.length === 0) return <div><p>Search by typing a name of a country</p></div>
    if (filteredCountries.length > 10) return <div><p>Too many matches, specify another filter</p></div>
    if (filteredCountries.length === 1) return <ShowCountry country={filteredCountries[0]}/>
    return <SomeMatches countries={filteredCountries} handleChange={handleChange}/>
    }

export default Countries