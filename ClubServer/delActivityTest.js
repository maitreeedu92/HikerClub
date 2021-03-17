const fetch = require('node-fetch');
//let eventData = require('./eventData1.json');

/*fetch('http://127.0.0.2:5555/delete-activity/Essential Hiking Gear for Beginners', {
 method: 'delete',
   body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json'
        },
}) */

fetch('http://127.0.0.1:3052/delete-activity/0DHz3FXcuvbM7zQu', {
 method: 'delete',
  
})

    .then(res => res.json())
    .then(json => console.log(json));
