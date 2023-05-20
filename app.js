const express = require('express');
const mysql = require('mysql');

//Create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
  });

  //connect
  db.connect((err) => {
    if(err) {
        console.log('Wrong connection')
    }else {
        console.log('Connected successfully')
    }
  })

const app = express();

//Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql3';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Database created...')
        res.end()
    })    
})

//create table
app.get('/createtb', (req, res) => {
    let sql = 'CREATE TABLE `users` (`id` INT NOT NULL AUTO_INCREMENT , `username` INT NOT NULL , `password` TEXT NOT NULL , `date` DATE NOT NULL , PRIMARY KEY (`id`))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Table created...')
        res.end()
    })    
})

//Insert into table
app.get('/insert', (req, res) => {
    let sql = 'INSERT INTO `users` set ?';
    let post = {id: 'null',username: 1122, password: 4042, date: "2023-05-20"};
    // db.query(sql, (err, result) => {
    //     if(err) throw err;
    //     console.log(result)
    //     res.send('Inserted success...')
    //     res.end()
    // })    
    let q = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Inserted 1 success...')
        res.end()
    })
})




//Select from table
app.get('/select', (req, res) => {
    let sql = 'SELECT * from `users`';
    let q = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(results)
        //res.end()
    })
})

//Select from table where something
app.get('/select/:id', (req, res) => {
    let sql = `SELECT * from users where id = ${req.params.id}`;
    let q = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(results)
        //res.end()
    })
})
    //Update table 
app.get('/update/:id', (req, res) => {
    let newUser = 244;
    let sql = `UPDATE users set username = '${newUser}' where id = ${req.params.id}`;
    let q = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send('Updated')
        //res.end()
    })
})

    //Delete from table 
    //New del comment
    app.get('/delete/:id', (req, res) => {
        let sql = `DELETE from users  where id = ${req.params.id}`;
        let q = db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results)
            res.send('Deleted')
            //res.end()
        })
    })

app.listen('3000', ()=> {
    console.log('Server started on port 3000');
    
})
