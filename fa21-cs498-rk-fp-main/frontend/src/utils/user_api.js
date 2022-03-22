import {user_db} from "./axoisConfig";
import hostName from "./HostName";

export function getUserByEmail(email) {
    return user_db({
        method: 'get',
        url: `http://${hostName}:4000/api/users?where={"email": "${email}"}`,
        headers: {}
    })
}