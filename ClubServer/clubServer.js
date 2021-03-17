// Returning and Taking JSON
const Ajv = require('ajv');//adding json validation
const fs = require('fs');
var express = require('express');
const session = require('express-session');
var app = express();

const bcrypt = require('bcryptjs');
/* start neDB */
const DataStore = require('nedb-promises');
let allMembers = DataStore.create('./usersDB.db');
let allactivities = DataStore.create('./activityDB.db');


let clubInfo = {"clubName": "Hiker Club", "ownerName": "Maitree Samanta", "ownerNetId": "th5924"};
let eventData = require('./eventData1.json');
let hashedUsers = require('./clubUsersHash.json');

/* JSON Schema */
const ajv = new Ajv();
const memberSchema = JSON.parse(fs.readFileSync('./memberSchema.json'));//import memberschema
const activitySchema = JSON.parse(fs.readFileSync('./activitySchema.json'));
const applicantSchema = JSON.parse(fs.readFileSync('./applicantSchema.json'));


//Starting cookie implementation
const cookieName = "HikerClub"; // Session ID cookie name
app.use(session({
    secret: 'website development CSUEB',
    resave: false,
    saveUninitialized: false,
    name: cookieName // Sets the name of the cookie used by the session middleware
}));

// This initializes session state
const setUpSessionMiddleware = function (req, res, next) {
    console.log(`session object: ${JSON.stringify(req.session)}`);
    console.log(`session id: ${req.session.id}`);
	if (!req.session.user) {
        req.session.user = {role: "guest"};
    };
    next();
};

app.use(setUpSessionMiddleware);
//app.use(express.json({ limit: '2KB' })); //Checking Schema limit
function memberOnly(req, res, next) {
	if(req.session.user.role === "guest") {
		res.status(401).json({error: "Not Permitted"})
	}
	else {
		console.log(`Session Info: ${JSON.stringify(req.session)}\n`);
		next();
	}
};

function adminOnly(req, res, next) {
	if(req.session.user.role !== "admin") {
		res.status(401).json({error: "Not Permitted"})
	}
	else {
		next();
	}
};

app.get('/info', express.json(), function(req, res) {
    //console.log(`path/info received: ${JSON.stringify(req.body)}`);
    res.json(clubInfo);
});

/* Adding activity using neDB */
app.post('/addThing', memberOnly, express.json({ limit: '2KB' }), async function(req, res) {
	console.log(`path /addActivities received: ${JSON.stringify(req.body)}`);
    //validating members schema against member json data
    var valid =  ajv.validate(activitySchema, req.body);
    console.log("what is valid"+valid);  
    
	//if not valid raise error
	if (!valid)
	{
		console.log("errors for adding activity"+ajv.errorsText());
		res.status(400).json({
				error:ajv.errorsText() ,
				message: 'Please provide valid data'
			});
			return;
	}
	//if no error found insert data into database    
    else{
		 let addactivity = await allactivities.insert(req.body);
		 let activityInfo = await allactivities.find({});
		 res.json(activityInfo);
		 }
	
});

/* Geting all activities using neDB */
app.get('/activities', express.json(), async function(req, res) {
    let activityInfo = await allactivities.find({});
	res.json(activityInfo);
});


/* Deleteing all activities using neDB */
app.delete('/delete-activity/:id', memberOnly, express.json(), async function(req, res) {
	
    let id= req.params.id;
    let info = await allactivities.remove({_id:id});
	
	if (info === 0) {
     console.log(`No such id ${id} exists`);
        res.status(400).json({
            error: true,
            message: 'Please provide valid ID'
        });
        return;

    } else {

    let acts= await allactivities.find({});
    res.json(acts); // returning our server side array via JSON
    //res.status(201).json(acts);
    }

    //Debugging code to see what the server got
    //console.log(`path /deleteActivities received: ${JSON.stringify(req.body)}`);
});

/* Adding member using neDB */
app.post('/addMember', adminOnly, express.json({ limit: '1KB' }), async function(req, res) {
	console.log(`path /addMembers received: ${JSON.stringify(req.body)}`);
	var valid =  ajv.validate(memberSchema, req.body);
    console.log("what is valid"+valid);  
	//if not valid raise error
	if (!valid)
	{
		console.log("errors for adding members"+ajv.errorsText());
		res.status(400).json({
				error:ajv.errorsText() ,
				message: 'Please provide valid data'
			});
			return;
	}
	//if no error found insert data into database    
    else{
		 let addMember = await allMembers.insert(req.body);
		 let memberInfo = await allMembers.find({});
		 res.json(memberInfo);
		 }
	
});


/* Getting member from database using neDB */
app.get('/get-member-activity/', adminOnly, express.json(), async function(req, res) {
    let members = await allMembers.find({});
    res.json(members); // returning our server side array via JSON
});

/* Deleteing member from database using neDB */
app.delete('/deleteMember/:id', adminOnly, express.json(), async function(req, res) {
	
	const id = req.params.id;
    let info = await allMembers.remove({_id:id});
	
	if (info === 0) {
     console.log(`No such id ${id} exists`);
        res.status(400).json({
            error: true,
            message: 'Please provide valid ID'
        });
        return;

    } else {

    let acts= await allMembers.find({});
    res.json(acts); // returning our server side array via JSON
    //res.status(201).json(acts);
    }
});

//Applicant Interface
app.post('/applicants', express.json({ limit: '2KB' }), async function (req, res) {
    // Debugging code to see what the server got
    console.log(`path /applicants received: ${JSON.stringify(req.body)}`);
  	//validating members schema against member json data
    var valid =  ajv.validate(applicantSchema, req.body);
    console.log("Valid value is:"+valid);  
        
    
	//if not valid raise error
	if (!valid)
	{
		console.log("errors for adding new applicants"+ajv.errorsText());
		res.status(400).json({
				error:ajv.errorsText() ,
				message: 'Please provide valid data'
			});
			return;
	}
	//if no error found insert data into database    
    else{
         res.status(200).json({
             message:'data is valid'
         })
         console.log("The applicant data is valid!!");
     }

});

app.use(express.static('public'));

//Login interface
app.post('/login', express.json(), async function (req, res) {
//console.log(req.body);
	let email = req.body.email;
	let password = req.body.password;
   
	let members = await allMembers.find({email:req.body.email});
	//console.log("members: "+members[0].password);
	let mamberLength = members.length;
	
	if (mamberLength === 0) {
		res.status(401).json({error: true, message: "User/Password error"});
		return;
	}
	else {
		bcrypt.compare(req.body.password, members[0].password).then(function(result) {
    	//console.log(result);
		if(result === true) {
			/* setting session-id */
			let oldInfo = req.session.user;
        	req.session.regenerate(function (err) {
            	if (err) {
					console.log(err);
				}
				else{ 
					let newInfo = {role: members[0].role}
					req.session.user = newInfo;
					delete members[0].password;
					//console.log(JSON.stringify(members[0]));
					res.json(members[0]);
					
			}
        });
		}
		else {
			res.status(401).send({error:true, message: 'User/Password error'});
		}
		}); 
	}
   
});


app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({message: "Goodbye"});
    })
});

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500);
  res.render('error', { error: err });
    console.log(JSON.stringify(err));
}


host = '127.0.0.1';
port = '3052';

app.listen(port, host, function () {
console.log(`Basic JSON app listening on IPv4: ${host}:${port}`);
});
