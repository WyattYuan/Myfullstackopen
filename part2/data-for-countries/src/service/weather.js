import axios from 'axios';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_API_KEY
// variable api_key now has the value set in startup

const getWeather = (city) => {
    const request = axios.get(`${baseURL}?q=${city}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { getWeather }