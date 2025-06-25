import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
    },
})

// Authorization header will be added by the auth store when a user logs in

export default http
