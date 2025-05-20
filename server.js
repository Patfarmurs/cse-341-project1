const express = require('express');
const mongodb = require('./routes/data/database.js'); 
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send("Helo World")
});

app.use('/', require('./routes/index.js'));

app.use('/', require('./routes/contacts.js'));


mongodb.initdb(function(err) {
    if (err) { 
        console.log(err);     
    } else { 
        app.listen(port, () => { 
            console.log(`Database is listening and Node running on port ${port}`); 
        }); 
    } 
});

