import './App.css'
import service from "./services/services"
import { useState, useEffect } from "react"

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    service
      .getAllCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))

  const handleQueryChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }



  return (
    <div>
      <h1>Rest countries App</h1>
      find countries: <input value={query} onChange={handleQueryChange} />
      {filteredCountries.length === 1 ? (
        (() => {
          const country = filteredCountries[0];
          const languages = country.languages;
          return (
            <div>
              <h1>{country.name.common}</h1>
              Capital {country.capital} <br />
              Area {country.area}
              <h1>Languages</h1>
              <ul>
                {Object.values(languages).map(lang => <li key={lang}>{lang}</li>)}
              </ul>
            </div>
          );
        })()
      ) : filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>{country.name.common}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
