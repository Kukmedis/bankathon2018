const apiUrl = 'https://bankathon-214706.appspot.com/';

let userName = 'jk@aazzur.com';

function get(endpoint) {
    return fetch(apiUrl + endpoint, {method: 'GET', headers: {'Content-Type': 'application/json'}});
}

function getUserData() {
    return get('fancy-categories?username=' + getUserName());
}

function getUserName() {
    return userName;
}

function setUserName(name) {
    userName = name;
}

export default {
    get,
    getUserData,
    getUserName,
    setUserName
}