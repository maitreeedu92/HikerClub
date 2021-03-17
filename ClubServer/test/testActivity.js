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
        res = await fetch(urlBase + 'activities');
        console.log("Back from fetch");
        myCookie = getCookies(res);
    })
    it('Cookie with appropriate name is returned', function () {
        assert.include(myCookie, 'HikerClub');
    });  
	
describe('Get Activity Tests', function () {
	let res;
	let activities = null;
	before(async function(){
		res = await fetch(urlBase + 'activities');
	})
	it('Everything is OK', async function(){
		assert.equal(res.status, 200);
	});
	it('Returns an array', async function(){
		activities = await res.json();
		assert.isArray(activities);
	});
	it('All activities elements have name and date', async function(){
		activities.forEach(function(activities){
			//assert.containsAllKeys(activities, ['name', 'dates','description', '_id']);
			//console.log(activities.name);
		});
	});

});


let event = {
    "name": "Hello",
    "dates": ["22nd October", "23rd October"],
    "description": "Positive thinking and a good attitude are key to hiking. Here we will share our experience, so that you will able to overcome your fears of hiking."
};

describe('Add Activity Tests', function () {

it('Try adding activity without logging in ', async function () {
    
    res = await fetch(urlBase + 'addThing', {
        method: "post",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
             cookie: myCookie
        }
    });
    
    console.log(`Add activity result for adding without logging in: ${res.statusText}`);
});



it('Login as a member and add activity ', async function () {
    
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "facer1912@yandex.com",
                    "password": "6^i\\W/^i"
                }),
                headers: {
                    "Content-Type": "application/json",
                     cookie: myCookie
                },
            });
    
   let savedCookie = res.headers.raw()["set-cookie"];
    
    res = await fetch(urlBase +'addThing', {
        method: "post",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
            cookie: savedCookie  
        },
    });
     
     console.log(`Add activity result logging in as a member: ${res.statusText}`);
    });

    
/* For checking JSON Schema */
	
let event1 = {
"name": "Hello",
"dates": ["22nd October", "23rd October"],
"description": "Positive thinking and a good attitude are key to hiking. Here we will share our experience, so that you will able to overcome your fears of hiking hikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghikinghiking."
};
	
	it('Overly Large JSON data is rejected ', async function () {
    
		res = await fetch(urlBase + 'login', {
			method: "post",
			body: JSON.stringify({
				"email": "facer1912@yandex.com",
				"password": "6^i\\W/^i"
			}),
			headers: {
				"Content-Type": "application/json",
				 cookie: myCookie
			},
		});

      let savedCookie = res.headers.raw()["set-cookie"];
    
      res = await fetch(urlBase +'addThing', {
			method: "post",
			body: JSON.stringify(event1),
			headers: {
				"Content-Type": "application/json",
				cookie: savedCookie  
			},
     });
     
     console.log(`Add Overly Large activity JSON data logging in as a member: ${res.statusText}`);
    });

let event2 = {
"dates": ["22nd October", "23rd October"],
"description": "Positive thinking and a good attitude are key to hiking. Here we will share our experience, so that you will able to overcome your fears of hiking."
};
	
	 it('Reject data with missing required fields ', async function () {

			res = await fetch(urlBase + 'login', {
				method: "post",
				body: JSON.stringify({
					"email": "facer1912@yandex.com",
					"password": "6^i\\W/^i"
				}),
				headers: {
					"Content-Type": "application/json",
					 cookie: myCookie
				},
			});

		  let savedCookie = res.headers.raw()["set-cookie"];

		  res = await fetch(urlBase +'addThing', {
				method: "post",
				body: JSON.stringify(event2),
				headers: {
					"Content-Type": "application/json",
					cookie: savedCookie  
				},
		 });

		 console.log(`Add activity data with missing required fields logging in as a member: ${res.statusText}`);
	});
    
  
});

describe('Delete Activity Tests', function () {

it('Try delete activity without logging in ', async function () {
    
    res = await fetch(urlBase + 'delete-activity/zYKclIbHl8MYWc2r', {
        method: "delete",
      
        headers: {
            "Content-Type": "application/json",
             cookie: myCookie
        }
    });
    
    console.log(`delete activity result without logging in : ${res.statusText}`);
});

    
 it('Try delete activity Login as a member', async function () {
    
          res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "facer1912@yandex.com",
                    "password": "6^i\\W/^i"
                }),
                headers: {
                    "Content-Type": "application/json",
                     cookie: myCookie
                },
            });
       let savedCookie = res.headers.raw()["set-cookie"];
       
    res = await fetch(urlBase + 'delete-activity/zYKclIbHl8MYWc2r', {
        method: "delete",
      
        headers: {
            "Content-Type": "application/json",
             cookie: savedCookie
        }
    });
       
  
    console.log(`delete activity result logging as a member: ${res.statusText}`);
});

    
 it('Try delete activity Login as a member for Bad delete', async function () {
    
          res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "facer1912@yandex.com",
                    "password": "6^i\\W/^i"
                }),
                headers: {
                    "Content-Type": "application/json",
                     cookie: myCookie
                },
            });
       let savedCookie = res.headers.raw()["set-cookie"];
       
		res = await fetch(urlBase + 'delete-activity/1cNniDReINYfeJpS', {
			method: "delete",

			headers: {
				"Content-Type": "application/json",
				 cookie: savedCookie
			}
		});
  
    console.log(`delete activity result logging as a member for bad delete: ${res.statusText}`);
 });
	
});    
    
});    