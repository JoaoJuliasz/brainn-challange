import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://brainn-api-loterias.herokuapp.com/api/v1/'
})

export default instance