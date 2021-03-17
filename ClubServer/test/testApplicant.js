const assert = require('chai').assert;
const fetch = require('node-fetch');
const urlBase = "http://127.0.0.1:3052/";

let applicantInfo1 = {
 "name":"Maitree",
 "email":"maitree@123.com",
 "password":"hello123",
 "experience":"Just Started",
 "comments":"I like the website!!"
};

let applicantInfo2 = {
 "name":"Maitree",
 "email":"maitree@123.com",
 "password":"hello123",
 "experience":"Just Started",
 "comments":"I like the website!! I like the website! I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!I like the website!"
};

let applicantInfo3 = {
 "name":"Maitree",
 "password":"hello123",
 "experience":"Just Started",
 "comments":"I like the website!!"
};

let applicantInfo4 = {
 "name":"Maitree",
 "email":"maitree",
 "password":"hello123",
 "experience":"Just Started",
 "comments":"I like the website!!"
};


describe('Add Applicant Tests', function () {

	it('Add Good Applicant ', async function () {

		res = await fetch(urlBase + 'applicants', {
			method: "post",
			body: JSON.stringify(applicantInfo1),
			headers: {
				"Content-Type": "application/json"
			}
		});

		console.log(`Add applicant result: ${res.statusText}`);
	});
 

	it('Too Long JSON Applicant ', async function () {

		res = await fetch(urlBase + 'applicants', {
			method: "post",
			body: JSON.stringify(applicantInfo2),
			headers: {
				"Content-Type": "application/json"
			}
		});

		console.log(`Add applicant result: ${res.statusText}`);
	});
 

	it('Missing Info Applicant ', async function () {

			res = await fetch(urlBase + 'applicants', {
				method: "post",
				body: JSON.stringify(applicantInfo3),
				headers: {
					"Content-Type": "application/json"
				}
			});

			console.log(`Add applicant result: ${res.statusText}`);
	});
	
	it('Bad Email Applicant ', async function () {

		res = await fetch(urlBase + 'applicants', {
			method: "post",
			body: JSON.stringify(applicantInfo4),
			headers: {
				"Content-Type": "application/json"
			}
		});

		console.log(`Add applicant result: ${res.statusText}`);
	});
  
    
});    