const fs = require('fs');
const bcrypt = require('bcryptjs');
const users = require('./clubUsers.json');
let nRounds = 10;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);

hashedUsers=users; //copying clubUsers data to hashedUsers
//console.log(hashedUsers)

// Hashing the password
hashedUsers.map(function(userList){
		  pass = userList.password;
		  let salt = bcrypt.genSaltSync(10); // New salt everytime!
		  let passHash = bcrypt.hashSync(pass, salt);
	
		  userList.password=passHash;
		  //console.log(hashedUsers);
		  })


let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
fs.writeFileSync("clubUsersHash.json", JSON.stringify(hashedUsers, null, 2));
