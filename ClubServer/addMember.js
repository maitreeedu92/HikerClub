const fetch = require('node-fetch');

let addMember = {"firstName": "Maitree", "lastName": "Samanta", "email": "maitree@gmail.com", "password": "123456", "role": "admin"};

fetch('http://127.0.0.1:3052/addMember', {
	method: 'post',
	body: JSON.stringify(addMember),
	headers: {
		'Content-Type': 'application/json'
	}
	})
.then(res => res.json())
.then(json => console.log(json));
