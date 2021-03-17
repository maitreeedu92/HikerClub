const fetch = require('node-fetch');

let applicantInfo = {
 "name":"Maitree",
 "email":"maitree@123.com",
 "password":"hello123",
 "experience":"Just Started",
 "comments":"I like the website!!"
};

fetch('http://127.0.0.1:3052/applicants', {
	method: 'post',
	body: JSON.stringify(applicantInfo),
	headers: {
		'Content-Type': 'application/json'
	}
	})
.then(res => res.json())
.then(json => console.log(json));
