const fetch = require('node-fetch');

/*let loginMember = {"email": "antonin2059@yahoo.com", "password": "[gbPmf`;"};

fetch('http://127.0.0.2:5555/loginTest/tirrivees1820@outlook.com/49OqspUq', {
	method: 'post',
	body: JSON.stringify(loginMember),
	headers: {
		'Content-Type': 'application/json'
	}
	})
.then(res => res.json())
.then(json => console.log(json));
*/


/* Testing the POST /tours/add API */
let urlBase="http://127.0.0.1:3052/";


function extractCookies(rawStrings) {
  let cookies = [];
  rawStrings.forEach(function (ck) {
    cookies.push(ck.split(";")[0]); // Just grabs cookie name=value part
  });
  return cookies.join(";"); // If more than one cookie join with ;
}

let member = {
    "firstName": "Demetrice",
    "lastName": "Parker",
    "email": "chihuahua1899@gmail.com",
    "password":"'E`Gj3iJ",
    "role":"guest"
};

let addMember = {
  url: urlBase + "addMember",
  options: {
    method: "POST",
    body: JSON.stringify(member),
    headers: { "Content-Type": "application/json" },
  },
};

/* Login as a Admin */
let loginAdmin = {
  url: urlBase + "login",
  options: {
    method: "POST",
    body: JSON.stringify({
      // admin user, see users.json file
      email: "tirrivees1820@outlook.com",
      password: "49OqspUq",
    }),
    headers: { "Content-Type": "application/json" },
  },
};

/* Login as a Member */
let loginMember = {
  url: urlBase + "login",
  options: {
    method: "POST",
    body: JSON.stringify({
      email: "umbrate1989@yahoo.com",
      password: "n3pLS4|=",
    }),
    headers: { "Content-Type": "application/json" },
  },
};

async function someTests() {
  console.log("Try adding member without logging in");
  try {
    let res = await fetch(addMember.url, addMember.options);
    console.log(`Add Member result: ${res.statusText}`);
  } catch (e) {
    console.log(`Error: ${e}\n`);
  }

  console.log("Login as admin, then adding member");
  try {
    let res = await fetch(loginAdmin.url, loginAdmin.options);
      console.log(loginAdmin.url);
      console.log(loginAdmin.options);
    console.log(`login results: ${res.statusText}`);
    // Look at the cookie
	let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
	console.log(`Saved cookie: ${savedCookie}`);
	addMember.options.headers.cookie = savedCookie;
	// User info from login
	let userInfo = await res.json();
	console.log(userInfo);
    res = await fetch(addMember.url, addMember.options);
      console.log(addMember.url);
      console.log(addMember.options);
	console.log(`Add Member result: ${res.statusText}\n`);
	let data = await res.json();
	console.log(data);
  } catch (e) {
    console.log(`Error: ${e}\n`);
  }

  console.log("Login as Member, then try adding event");
  try {
    let res = await fetch(loginMember.url, loginMember.options);
    console.log(`login results: ${res.statusText}`);
    // Look at the cookie
	let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
	console.log(`Saved cookie: ${savedCookie}`);
	addMember.options.headers.cookie = savedCookie;
	// User info from login
	let userInfo = await res.json();
	console.log(userInfo);
    res = await fetch(addMember.url, addMember.options);
	console.log(`Add Member result: ${res.statusText}\n`);
	let data = await res.json();
	console.log(data);
  } catch (e) {
    console.log(`Error: ${e}\n`);
  }
}

someTests();

