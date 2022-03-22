import axios from 'axios'
import hostName from "./HostName";

export const user_db = axios.create({
    timeout: 500000,
    baseURL: `http://${hostName}:4000/api/users`,
})

export const post_db = axios.create({
    timeout: 500000,
    baseURL: `http://${hostName}:4000/api/posts`,
})

export const post_search_db = axios.create({
    timeout: 500000,
    baseURL: `http://${hostName}/api/postSearch`,
})