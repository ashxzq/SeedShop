import hostName from "./HostName";

const axios = require('axios');

export async function postPost(post) {
    let config = {
        method: 'post',
        url: `http://${hostName}:4000/api/posts`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: post
    };

    return axios(config);
}
