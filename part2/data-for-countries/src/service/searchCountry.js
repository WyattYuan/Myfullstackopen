import axios from 'axios';
const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const request = axios.get(`${baseURL}/api/all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseURL}/api/name/${name}`)
    return request.then(response => response.data)
}

export default { getAll, getCountry }