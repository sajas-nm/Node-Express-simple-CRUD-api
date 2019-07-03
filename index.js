const express = require("express");
const bodyParser = require('body-parser');
const con = require('./config')
const app = express();

// middlewears
app.use(bodyParser.json());

// GET ALL CUSTOMERS
app.get('/customers', (req, res) => {
    con.query('SELECT * FROM customer', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: true,
                message: "somthing went wrong . try again!"
            })
        } else {
            res.send(rows)
        }
    });
})
// GET CUSTOMER 
app.get('/customer/:id', (req, res) => {
    //console.log("first ", req.params)
    let id = req.params.id
    // console.log("id only ",id);
    con.query(`SELECT * FROM customer WHERE id= ${id}`, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: true,
                message: "somthing went wrong . try again!"
            })
        } else {
            res.json({
                error: null,
                data: rows,
            })
        }
    });
    //console.log(req.query)
})
// ADD CUSTOMER 
app.post('/customer', (req, res) => {

    let name = req.body.name
    let email = req.body.email
    let add_cus = `INSERT INTO customer(name,email) VALUES ( ?,? )`;


    con.query(add_cus, [name, email], (error, rows) => {
        if (error) {
            console.log(error)
            res.status(500).json({
                error: true,
                message: 'could not add coustomer Try again!'
            })
        } else {
            res.json({
                data: rows
            })
            console.log(add_cus)
        }
    })
})

// UPDATE CUSTOMER 
app.put('/customer/:id', (req, res) => {
    let id = req.params.id
    let name = req.body.name
    let email = req.body.email

    let upd_cus = `UPDATE  customer SET name=? ,email=? WHERE id= ${id}`;


    con.query(upd_cus, [name, email], (error) => {
        if (error) {
            console.log(error)
            res.status(500).json({
                error: true,
                message: 'could not update coustomer Try again!'
            })
        } else {
            res.send('Updated Successfully')
            console.log(add_cus)
        }
    })
})

//DELETE CUSTOMER 
app.delete('/customer/:id', (req, res) => {
    let id = req.params.id
    let del_cus = `DELETE FROM customer WHERE id= ${id}`;

    con.query(del_cus, (error) => {
        if (error) {
            console.log(error)
            res.status(500).json({
                error: true,
                message: 'could not delete coustomer Try again!'
            })
        } else {
            res.send('Deleted Successfully...')
            console.log(del_cus)
        }
    })
})

//SERVER
app.listen(3600, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server running on port 3500")
    }
})
