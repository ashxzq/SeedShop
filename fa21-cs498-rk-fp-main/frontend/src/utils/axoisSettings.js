import React from 'react';
import axios from 'axios';
import hostName from "./HostName";

const userUrl = `http://${hostName}:4000/api/users`;

export async function postUser(rawData) {
    let config = {
        method: 'post', url: userUrl, headers: {
            'Content-Type': 'application/json'
        }, data: rawData
    };

    await axios(config)
        .then(function (response) {
            //success = true;
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function updateUserByUserId(userId, data) {
    let config = {
        method: 'put', url: `http://${hostName}:4000/api/users/${userId}`, headers: {
            'Content-Type': 'application/json'

        }, data: data
    };

    await axios(config)
        .then(function (response) {
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


export function getPostByPostId(postId) {
    const preUrl = `http://${hostName}:4000/api/posts/`;
    const url = preUrl.concat(postId);
    let config = {
        method: 'get', url: url, headers: {}
    };

    // console.log(config.url);
    return axios(config);
    // .then(function (response) {
    //   console.log(response.data);
    //   return JSON.stringify(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });


}

export async function getAllPosts() {
    let config = {
        method: 'get', url: `http://${hostName}/api/posts`, headers: {}
    };

    return axios(config);
}

export async function deletePostByPostId(postId) {
    const preUrl = `http://${hostName}:4000/api/posts/`;
    const url = preUrl.concat(postId);
    let config = {
        method: 'delete', url: url, headers: {}
    };

    return axios(config);
}

export async function getOrderByOrderId(orderId) {
    const preUrl = `http://${hostName}:4000/api/orders/`;
    const url = preUrl.concat(orderId);
    var config = {
        method: 'get', url: url, headers: {}
    };

    return axios(config);
}

export async function postOrder(order) {

    let config = {
        method: 'post', url: `http://${hostName}/api/orders`, headers: {
            'Content-Type': 'application/json'
        }, data: order
    };

    return axios(config);
}

export function deleteOrderByOrderId(orderId) {
    const preUrl = `http://${hostName}:4000/api/orders/`;
    const url = preUrl.concat(orderId);
    let config = {
        method: 'delete', url: url, headers: {}
    };

    return axios(config)
}



