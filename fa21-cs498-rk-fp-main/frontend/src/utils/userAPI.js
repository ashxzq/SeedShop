import hostName from "./HostName";

const axios = require('axios');

export async function getUserByEmail(email) {
    let config = {
        method: 'get',
        url: `http://${hostName}:4000/api/users?where={"email": "${email}"}`,
        headers: {}
    };

    return axios(config);
}