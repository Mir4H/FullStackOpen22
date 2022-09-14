import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

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