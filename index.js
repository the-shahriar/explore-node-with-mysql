const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { parse } = require('path');
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

// send data to database from client side
app.post('/userData', (req, res)=> {
    const id = req.body.id;
    const name = req.body.name;
    const designation = req.body.designation;
    const employee_grade= req.body.employee_grade;
    const flat_size = req.body.flat_size;
    const building_name = req.body.building_name;
    const flat_name = req.body.flat_name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const down_payment_percent = req.body.down_payment_percent;
    const installment_1 = parseInt(req.body.installment_1);
    const installment_1_date = req.body.installment_1_date;
    const pay_order_number_installment_1 = req.body.pay_order_number_installment_1;
    const installment_2 = parseInt(req.body.installment_2);
    const installment_2_date = req.body.installment_2_date;
    const pay_order_number_installment_2 = req.body.pay_order_number_installment_2;
    const installment_3 = parseInt(req.body.installment_3);
    const installment_3_date = req.body.installment_3_date;
    const pay_order_number_installment_3 = req.body.pay_order_number_installment_3;
    const installment_4 = parseInt(req.body.installment_4);
    const installment_4_date = req.body.installment_4_date;
    const pay_order_number_installment_4 = req.body.pay_order_number_installment_4;
    const total_amount = req.body.total_amount;
    const paid_amount = installment_1 + installment_2 + installment_3 + installment_4;
    const dues_amount = total_amount - paid_amount;
    console.log(total_amount, paid_amount, dues_amount);

    // inserting to database
    db.query("INSERT INTO user_data (id, name, designation, employee_grade, flat_size, building_name, flat_name, address, phone_number, email, down_payment_percent, installment_1, installment_1_date, pay_order_number_installment_1, installment_2, installment_2_date, pay_order_number_installment_2, installment_3, installment_3_date, pay_order_number_installment_3, installment_4, installment_4_date,pay_order_number_installment_4, total_amount, paid_amount, dues_amount ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, name, designation, employee_grade, flat_size, building_name, flat_name, address, phone_number, email, down_payment_percent, installment_1, installment_1_date, pay_order_number_installment_1, installment_2, installment_2_date, pay_order_number_installment_2, installment_3, installment_3_date, pay_order_number_installment_3, installment_4, installment_4_date,pay_order_number_installment_4, total_amount, paid_amount, dues_amount], (err, result)=> {
        if(err){
            console.log(err);
        }
        else{
            res.json('Values Inserted');
        }
    });
    
})

// delete single entry from database
app.delete('/userData/:id', (req, res)=> {
    const id  = req.params.id;
    console.log(id);
    db.query(`DELETE FROM user_data WHERE id = ${id}`, (err, result)=> {
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }
    })
})

app.listen(port, ()=> {
    console.log('Server is listening from', port);
})