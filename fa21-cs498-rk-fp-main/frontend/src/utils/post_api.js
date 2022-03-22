import {post_db, post_search_db} from "./axoisConfig";

export function getAllPosts() {
    return post_db({
        method: 'get',
        url: '',
        headers: {}
    })
}

export function searchPosts(query) {
    return post_search_db({
        method: 'get',
        url: `?text=${query}`,
        headers: {}
    })
}

export function getNewest12() {
    return post_db({
        method: 'get',
        url: `?sort={"date": -1}&limit=12`,
        headers: {}
    })
}
