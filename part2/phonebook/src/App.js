import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const baseUrl = 'https://restcountries.com/v3.1/all'
  const [filtered, setFiltered] = useState([])
  const [searchName, setSearchName] = useState('')
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}`).then(response => { 
      setAllCountries(response.data);
    });
  }, [])

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    const filtered = allCountries.filter((country) => country.name.common.toLowerCase().includes(event.target.value))
    setFiltered(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleChange={handleSearchName}/>
      <Countries countries={filtered}/>
      
    </div>
  )
}

const Filter = (props) => {
  return (
    <>
      filter shown with <input value={props.searchName} onChange={props.handleChange}/>
    </>
  )
}

const Countries = (props) => {
  if (props.countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (props.countries.length === 1) {
    return (
      <div>
        <p>capital {props.countries[0].capital}</p>
        <p>area {props.countries[0].area}</p>
        <h1>languages:</h1>
        <ul>
          {Object.values(props.countries[0].languages).map((language) => <li>{language}</li>)}
        </ul>
        <img 
          src={props.countries[0].flags.png}
          alt="new"
        />
      </div>
    )
  }
  return (
    props.countries.map((country) => <p key={country.name.common}>{country.name.common}</p>)
  )
}

export default App