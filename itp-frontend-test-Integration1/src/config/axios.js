import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4444/api',
  withCredentials: true,
})

export default axiosInstance
