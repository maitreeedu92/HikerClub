// Create a NeDB datastore for events

const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/activityDB.db', autoload: true});

const events = require('./eventData1.json');
// We let NeDB create _id property for us.


db.insert(events, function(err, newDocs) {
	if(err) {
		console.log("Something went wrong when writing");
		console.log(err);
	} else {
		console.log("Added " + newDocs.length + " events");
	}
});
