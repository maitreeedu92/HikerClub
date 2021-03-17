const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const urlBase = "http://127.0.0.1:3052/";

describe('Login Tests', function () {
    let res;
    //let members = null;
	let info = null;
    let myCookie = null;

    before(async function () {
        console.log("Calling fetch");
        res = await fetch(urlBase + 'info');
        console.log("Back from fetch");
        myCookie = getCookies(res);
    })
	/*before(async function () {
        console.log("Calling fetch");
        res = await fetch(urlBase + 'info');
        console.log("Back from fetch");
        myCookie = getCookies(res);
    })*/
    it('Cookie with appropriate name is returned', function () {
        assert.include(myCookie, 'HikerClub');
    });
    describe('Login Sequence', function () {
        before(async function () {
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
        });
        it('Login Good', function () {
            assert.equal(res.status, 200);
        });
        it('User returned', async function () {
            let user = await res.json();
            assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
        });
        it('Cookie session ID changed', function () {
            let cookie = getCookies(res);
            assert.notEmpty(cookie);
            assert.notEqual(cookie, myCookie);
            console.log(cookie, myCookie);
        });
		
		it('Logout', async function () {
          
			 res = await fetch(urlBase + 'logout');
             console.log("Logout, cookie cleared");
           
        });

    });
    describe('Bad Logins', function () {
        it('Bad Email', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "Bstedhorses1903@yahoo.com",
                    "password": "nMQs)5Vi"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
        it('Bad Password', async function () {
            before(async function () {
                res = await fetch(urlBase + 'login', {
                    method: "post",
                    body: JSON.stringify({
                        "email": "tirrivees1820@outlook.com",
                        "password": "49OqspU"
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 401);
            });
        })
    });
})