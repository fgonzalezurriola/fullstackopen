import "./App.css";
import service from "./services/services";
import { useState, useEffect } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    service.getAllCountries().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  const handleQueryChange = (event) => {
    console.log(event.target.value);
    setQuery(event.target.value);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  if (selectedCountry) {
    const languages = selectedCountry.languages;
    return (
      <div>
        <h1>Rest countries App</h1>
        find countries: <input value={query} onChange={handleQueryChange} />
        <div>
          <h1>{selectedCountry.name.common}</h1>
          Capital {selectedCountry.capital} <br />
          Area {selectedCountry.area}
          <h1>Languages</h1>
          <ul>
            {Object.values(languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <h1 style={{ fontSize: "10rem" }}>{selectedCountry.flag}</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Rest Countries App</h1>
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
                {Object.values(languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <h1 style={{ fontSize: "10rem" }}>{country.flag}</h1>
            </div>
          );
        })()
      ) : filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <div>
          {filteredCountries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)} style={{ marginLeft: "10px" }}>
                show
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
