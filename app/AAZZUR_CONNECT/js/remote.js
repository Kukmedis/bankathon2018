const apiUrl = 'https://bankathon-214706.appspot.com/';

function get(endpoint) {
    return fetch('https://bankathon-214706.appspot.com/' + endpoint, {method: 'GET', headers: {'Content-Type': 'application/json',}});
}

export default {
    get,
}