const express = require('express');
const mongodb = require('./routes/data/database.js'); 
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const port = process.env.PORT || 3000;



app.use(express.json());



app.get('/', (req, res) => {
    res.send("Helo World")
});

app.use('/', require('./routes/index.js'));

app.use('/contacts', require('./routes/contacts.js'));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongodb.initdb(function(err) {
    if (err) { 
        console.log(err);     
    } else { 
        app.listen(port, () => { 
            console.log(`Database is listening and Node running on port ${port}`); 
        }); 
    } 
});

