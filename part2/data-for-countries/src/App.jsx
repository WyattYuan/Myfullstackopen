import countryService from './service/searchCountry'
import weatherService from './service/weather'
import { useState, useEffect } from 'react'

const ShowList = ({ coutries, data, setCountry, weather }) => {
  if (coutries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (coutries.length > 1) {
    return (
      <div>
        <ul>
          {coutries.map(c =>
            <li key={c}>{c}  <button onClick={() => setCountry(c)}>Show</button></li>
          )}
        </ul>
      </div>

    )
  } else if (coutries.length === 1) {
    if (data !== null && weather !== null) {
      return (
        <div>
          <h1>{data.name.common}</h1>
          <p>Capital {data.capital[0]}</p>
          <p>Area {data.area}</p>
          <h1>Languages</h1>
          <ul>
            {
              Object.values(data.languages).map((element, index) => (
                <li key={index}>{element}</li>
              ))
            }
          </ul>
          <img src={data.flags.png} alt={data.name.common} />
          <h1>Weather in {data.capital[0]}</h1>
          {/* {console.log(weather)} */}
          <p>Temperature: {weather.main.temp}°C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )
    }
  } else {
    return <div>No country matches!</div>
  }


}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [country, setCountry] = useState('')
  const [data, setData] = useState(null)
  const [weather, setWeather] = useState(null)


  useEffect(() => { countryService.getAll().then(data => setAllCountries(data.map(x => x.name.common))) }, [])
  const countriesMatched = allCountries.filter(c => c.toLowerCase().includes(country.toLowerCase()))
  useEffect(() => {
    if (countriesMatched.length === 1) {
      countryService.getCountry(countriesMatched.at(0)).then((data => setData(data)))
    }
  }, [country])
  useEffect(() => {
    if (data !== null) {
      weatherService.getWeather(data.capital[0]).then((data => setWeather(data)))
    }
  }, [data])

  return (
    <div>
      <input onChange={(event) => { setCountry(event.target.value) }}></input>
      <ShowList coutries={countriesMatched} data={data} setCountry={setCountry} weather={weather} />
    </div>
  )
}

export default App
