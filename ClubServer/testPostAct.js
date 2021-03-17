const fetch = require('node-fetch');

let eventThings = {"Name": "Addressing Your Fears of Hiking", "Date": ["22nd October", "23rd October"], "Description": "Positive thinking and a good attitude are key to hiking. Here we will share our experience, so that you will able to overcome your fears of hiking."};

fetch('http://127.0.0.1:3052/addThing', {
	method: 'post',
	body: JSON.stringify(eventThings),
	headers: {
		'Content-Type': 'application/json'
	}
	})
.then(res => res.json())
.then(json => console.log(json));
