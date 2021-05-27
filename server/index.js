const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: 'eu-cdbr-west-01.cleardb.com',
  user: 'b3703cdc91a348',
  password: '18218d95',
  database: 'heroku_f8ab9358321a201',
});
//mysql://b3703cdc91a348:18218d95@eu-cdbr-west-01.cleardb.com/heroku_f8ab9358321a201?reconnect=true
//create new record
app.post('/create', (req, res) => {
  let data = {
    name: req.body.name,
    password: req.body.password,
  };
  let sql = 'INSERT INTO registration SET ?';
  let query = db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send('New records created');
  });
});
//show all data
app.get('/view', (req, res) => {
  let sql = 'SELECT * FROM registration';
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//show single data to edit
app.get('/view/:id', (req, res) => {
  let sql = 'SELECT * FROM registration WHERE id=' + req.params.id;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//update the data
app.put('/update', (req, res) => {
  let sql =
    "UPDATE registration SET name='" +
    req.body.name +
    "', password='" +
    req.body.password +
    "'WHERE id=" +
    req.body.id;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Records updated');
  });
});
//delete a record
app.delete('/delete/:id', (req, res) => {
  let sql = 'DELETE FROM registration WHERE id=' + req.params.id;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Record deleted from Database');
  });
});

const port = process.env.PORT || PORT;

app.listen(port, () => console.log(`Server running on port: ${port}`));
