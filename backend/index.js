const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config();
const os = require('os');

const hostname = os.hostname();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PORT
});

console.log('$$$$$$$$$$$$$$$$$',hostname);

db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    db.query('CREATE TABLE IF NOT EXISTS table_to_do (id int NOT NULL AUTO_INCREMENT, description varchar(255),PRIMARY KEY (id))');
    console.log('Connected to database');
});

app.get('/api/todos', (req, res) => {
    db.query('SELECT * FROM table_to_do', (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        res.send(result);
    });
});

app.post('/api/todos', (req, res) => {
    const { description } = req.body;
    db.query(`INSERT INTO table_to_do (description) VALUES (?)`, [description], (err) => {
      if (err) {
        res.status(500).send('Unable to create todo');
      } else {
        res.send('Todo created successfully');
      }
    });
  });
  
  app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM table_to_do WHERE id = ?`, [id], (err) => {
      if (err) {
        res.status(500).send('Unable to delete todo');
      } else {
        res.send('Todo deleted successfully');
      }
    });
  });
  

app.listen(3000, () => {
    console.log('Server running on port 3000');
});