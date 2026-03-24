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
  const allCoutries = [
    "Kuwait",
    "Austria",
    "Mayotte",
    "Tunisia",
    "Japan",
    "Guyana",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Martin",
    "Guatemala",
    "Venezuela",
    "French Southern and Antarctic Lands",
    "Cape Verde",
    "Azerbaijan",
    "Guernsey",
    "Kenya",
    "South Sudan",
    "Myanmar",
    "Liechtenstein",
    "Martinique",
    "Australia",
    "Costa Rica",
    "Palestine",
    "Spain",
    "Guinea-Bissau",
    "Åland Islands",
    "Sierra Leone",
    "Philippines",
    "Togo",
    "Russia",
    "Haiti",
    "South Korea",
    "Samoa",
    "Aruba",
    "Afghanistan",
    "Bouvet Island",
    "Bahamas",
    "Georgia",
    "Cayman Islands",
    "North Macedonia",
    "Syria",
    "Hong Kong",
    "Chile",
    "Zimbabwe",
    "Caribbean Netherlands",
    "Netherlands",
    "Canada",
    "Equatorial Guinea",
    "Eswatini",
    "Oman",
    "United States",
    "Heard Island and McDonald Islands",
    "Romania",
    "South Africa",
    "Mozambique",
    "Trinidad and Tobago",
    "Bahrain",
    "Republic of the Congo",
    "Lebanon",
    "Réunion",
    "Estonia",
    "Bangladesh",
    "Ethiopia",
    "Peru",
    "South Georgia",
    "Ecuador",
    "Vatican City",
    "Mauritius",
    "American Samoa",
    "Saint Pierre and Miquelon",
    "Cuba",
    "British Indian Ocean Territory",
    "Vietnam",
    "Benin",
    "Greece",
    "Grenada",
    "Belize",
    "China",
    "Montenegro",
    "Thailand",
    "Guam",
    "Comoros",
    "Laos",
    "Mali",
    "Germany",
    "Suriname",
    "Gambia",
    "Maldives",
    "Tonga",
    "Antigua and Barbuda",
    "Guinea",
    "Curaçao",
    "Panama",
    "Papua New Guinea",
    "New Caledonia",
    "Croatia",
    "Palau",
    "United States Virgin Islands",
    "Cambodia",
    "Puerto Rico",
    "French Polynesia",
    "Nicaragua",
    "Colombia",
    "Mauritania",
    "Botswana",
    "Fiji",
    "Latvia",
    "Svalbard and Jan Mayen",
    "Bermuda",
    "Uganda",
    "Bosnia and Herzegovina",
    "Gabon",
    "Chad",
    "Cocos (Keeling) Islands",
    "Kazakhstan",
    "Pitcairn Islands",
    "Guadeloupe",
    "Sudan",
    "Dominica",
    "Qatar",
    "Barbados",
    "Turkey",
    "Denmark",
    "Marshall Islands",
    "Yemen",
    "Antarctica",
    "São Tomé and Príncipe",
    "Turkmenistan",
    "North Korea",
    "Portugal",
    "Eritrea",
    "Gibraltar",
    "Mongolia",
    "Kosovo",
    "Anguilla",
    "Malawi",
    "Tuvalu",
    "Moldova",
    "Brunei",
    "United States Minor Outlying Islands",
    "Finland",
    "Ghana",
    "Dominican Republic",
    "Northern Mariana Islands",
    "Czechia",
    "Morocco",
    "Honduras",
    "Israel",
    "Madagascar",
    "Luxembourg",
    "Armenia",
    "Turks and Caicos Islands",
    "Falkland Islands",
    "Angola",
    "Cyprus",
    "Indonesia",
    "Uzbekistan",
    "Burundi",
    "Albania",
    "Saint Barthélemy",
    "Bolivia",
    "Kyrgyzstan",
    "United Arab Emirates",
    "Paraguay",
    "Tanzania",
    "Argentina",
    "Pakistan",
    "Nepal",
    "New Zealand",
    "Switzerland",
    "Norfolk Island",
    "Sweden",
    "Saint Lucia",
    "Uruguay",
    "Mexico",
    "Somalia",
    "Montserrat",
    "Norway",
    "Seychelles",
    "Nauru",
    "Bhutan",
    "Rwanda",
    "Hungary",
    "Slovenia",
    "Sint Maarten",
    "India",
    "French Guiana",
    "Italy",
    "Singapore",
    "Ireland",
    "Andorra",
    "Iceland",
    "Micronesia",
    "Faroe Islands",
    "Saint Kitts and Nevis",
    "Niger",
    "France",
    "Djibouti",
    "Liberia",
    "Taiwan",
    "Jordan",
    "Greenland",
    "Libya",
    "Kiribati",
    "Cook Islands",
    "Lesotho",
    "Monaco",
    "Malaysia",
    "Wallis and Futuna",
    "Saudi Arabia",
    "Bulgaria",
    "Burkina Faso",
    "Brazil",
    "Lithuania",
    "Jersey",
    "Algeria",
    "Solomon Islands",
    "Sri Lanka",
    "San Marino",
    "United Kingdom",
    "Nigeria",
    "Slovakia",
    "Cameroon",
    "Namibia",
    "Egypt",
    "Saint Vincent and the Grenadines",
    "Belarus",
    "Ukraine",
    "Christmas Island",
    "Niue",
    "Jamaica",
    "Zambia",
    "Senegal",
    "Belgium",
    "Central African Republic",
    "Iran",
    "Iraq",
    "Timor-Leste",
    "Isle of Man",
    "Macau",
    "El Salvador",
    "Malta",
    "Poland",
    "Serbia",
    "Ivory Coast",
    "Western Sahara",
    "DR Congo",
    "Tajikistan",
    "Vanuatu",
    "Tokelau",
    "British Virgin Islands"
  ]
  // const [allCoutries, setAllCountries] = useState('')
  const [country, setCountry] = useState('')
  const [data, setData] = useState(null)
  const [weather, setWeather] = useState(null)


  // useEffect(() => { countryService.getAll().then(data => setAllCountries(data.map(x => x.name.common))) }, [])
  const coutriesMatched = allCoutries.filter(c => c.toLowerCase().includes(country.toLowerCase()))
  useEffect(() => {
    if (coutriesMatched.length === 1) {
      countryService.getCountry(coutriesMatched.at(0)).then((data => setData(data)))
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
      <ShowList coutries={coutriesMatched} data={data} setCountry={setCountry} weather={weather} />
    </div>
  )
}

export default App
