const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const urlBase = "http://127.0.0.1:3052/";

describe('Login Tests', function () {
    let res;
    let activities = null;
    let myCookie = null;

    before(async function () {
        console.log("Calling fetch");
        res = await fetch(urlBase + 'get-member-activity/');
        console.log("Back from fetch");
        myCookie = getCookies(res);
    })
    it('Cookie with appropriate name is returned', function () {
        assert.include(myCookie, 'HikerClub');
    });  

	
describe('Get Member Tests', function () {

	it('Try getting member without logging in ', async function () {

		res = await fetch(urlBase + 'get-member-activity/', {

		});

		console.log(`Get all members result without logging in: ${res.statusText}`);
	});


	it('Login as admin and get members ', async function () {

		res = await fetch(urlBase + 'login', {
			method: "post",
			body: JSON.stringify({
				"email": "tirrivees1820@outlook.com",
				"password": "49OqspUq"
			}),
			headers: {
				"Content-Type": "application/json",
				 cookie: myCookie
			},
		});

	   let savedCookie = res.headers.raw()["set-cookie"];

		res = await fetch(urlBase + 'get-member-activity/', {
			method: "get",
			//body: JSON.stringify(memberInfo),
			headers: {
				"Content-Type": "application/json",
				 cookie: savedCookie  
			},
		});


	 console.log(`Get all members result logging in as a admin: ${res.statusText}`);
	}); 
  
});


let memberInfo = {
    "firstName": "Hiya",
    "lastName": "Morton",
    "email": "hiya@outlook.com",
    "password": ".zID>]H8",
    "role": "member"
};

describe('Add Member Tests', function () {

	it('Try adding member without logging in ', async function () {

		res = await fetch(urlBase + 'addMember', {
			method: "post",
			body: JSON.stringify(memberInfo),
			headers: {
				"Content-Type": "application/json",
				 cookie: myCookie
			}
		});

		console.log(`Add member result for adding without logging in: ${res.statusText}`);
	});

	it('Login as a admin and add member ', async function () {

				res = await fetch(urlBase + 'login', {
					method: "post",
					body: JSON.stringify({
						"email": "tirrivees1820@outlook.com",
						"password": "49OqspUq"
					}),
					headers: {
						"Content-Type": "application/json",
						 cookie: myCookie
					},
				});

	   let savedCookie = res.headers.raw()["set-cookie"];

		res = await fetch(urlBase +'addMember', {
			method: "post",
			body: JSON.stringify(memberInfo),
			headers: {
				"Content-Type": "application/json",
				cookie: savedCookie  
			},
		});

		 console.log(`Add member result logging in as a admin: ${res.statusText}`);
		});  
	
	/* For Checking JSON Schema */
	
let memberInfo1 = {
    "firstName": "Hiya",
    "lastName": "Morton MortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMortonMorton",
    "email": "hiya@outlook.com",
    "password": ".zID>]H8",
    "role": "member"
};
	
	it('Overly Large JSON data is rejected ', async function () {

				res = await fetch(urlBase + 'login', {
					method: "post",
					body: JSON.stringify({
						"email": "tirrivees1820@outlook.com",
						"password": "49OqspUq"
					}),
					headers: {
						"Content-Type": "application/json",
						 cookie: myCookie
					},
				});

	   let savedCookie = res.headers.raw()["set-cookie"];

		res = await fetch(urlBase +'addMember', {
			method: "post",
			body: JSON.stringify(memberInfo1),
			headers: {
				"Content-Type": "application/json",
				cookie: savedCookie  
			},
		});

		 console.log(`Add Overly Large JSON data member logging in as a admin: ${res.statusText}`);
		});  
	
let memberInfo2 = {
"firstName": "Hiya",
"lastName": "Morton",
"password": ".zID>]H8",
"role": "member"
};
	
	it('Reject data with missing required fields ', async function () {

				res = await fetch(urlBase + 'login', {
					method: "post",
					body: JSON.stringify({
						"email": "tirrivees1820@outlook.com",
						"password": "49OqspUq"
					}),
					headers: {
						"Content-Type": "application/json",
						 cookie: myCookie
					},
				});

	   let savedCookie = res.headers.raw()["set-cookie"];

		res = await fetch(urlBase +'addMember', {
			method: "post",
			body: JSON.stringify(memberInfo2),
			headers: {
				"Content-Type": "application/json",
				cookie: savedCookie  
			},
		});

		 console.log(`Add member result with missing required fields logging in as a admin: ${res.statusText}`);
		});  



});

describe('Delete Member Tests', function () {

	it('Try delete member without logging in ', async function () {

		res = await fetch(urlBase + 'deleteMember/zZyVhBRaeb6AK0Io', {
			method: "delete",

			headers: {
				"Content-Type": "application/json",
				 cookie: myCookie
			}
		});

		console.log(`delete member result without logging in : ${res.statusText}`);
	});

    
	 it('Try delete member Login as a admin', async function () {

		  res = await fetch(urlBase + 'login', {
				method: "post",
				body: JSON.stringify({
					"email": "tirrivees1820@outlook.com",
					"password": "49OqspUq"
				}),
				headers: {
					"Content-Type": "application/json",
					 cookie: myCookie
				},
			});
		   let savedCookie = res.headers.raw()["set-cookie"];

			res = await fetch(urlBase + 'deleteMember/dq82WuIUZpWDj3s5', {
				method: "delete",

				headers: {
					"Content-Type": "application/json",
					 cookie: savedCookie
				}
			});

			console.log(`delete member result logging as a admin: ${res.statusText}`);
	});

    
	 it('Try delete member Login as a admin for Bad delete', async function () {

		  res = await fetch(urlBase + 'login', {
				method: "post",
				body: JSON.stringify({
					"email": "tirrivees1820@outlook.com",
					"password": "49OqspUq"
				}),
				headers: {
					"Content-Type": "application/json",
					 cookie: myCookie
				},
			});
		   let savedCookie = res.headers.raw()["set-cookie"];

			res = await fetch(urlBase + 'deleteMember/zZyVhBRaeb6AK0Io', {
				method: "delete",

				headers: {
					"Content-Type": "application/json",
					 cookie: savedCookie
				}
			});

		console.log(`delete member result logging as a admin for bad delete: ${res.statusText}`);
	 });
	
});    
    
});    