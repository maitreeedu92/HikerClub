const fetch = require('node-fetch');

fetch('http://127.0.0.1:3052/get-member-activity/')
    .then(res => res.json())
    .then(json => console.log(json));