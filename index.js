const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


db.connect(function(err) {
    if (err) {
      return console.error('Error: ' + err.message);
    }
  
    console.log('Connected to the database.');
});

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> {
    res.send('Hello world');
    
})

// getting data from database
app.get('/userData', (req, res)=> {
    db.query("SELECT * FROM user_data", (err, result)=> {
        if(err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})

app.listen(port, ()=> {
    console.log('Server is listening from', port);
})