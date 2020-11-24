const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const cors = require('cors');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//Mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'serviceame'
});

app.get('/ver_tecnico/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM usuarios WHERE row_id = ${id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not results');
        }
    });
});

app.get('/listar_tecnicos', (req, res) => {
    const sql = 'SELECT * FROM usuarios WHERE tipo = 2';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send('Not results');
        }
    });
});

app.get('/listar_calificaciones_tecnico/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM calificaciones WHERE id_tecnico = ${id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send('Not results');
        }
    });
});

//Route
app.get('/', (req, res) => {
    res.send('Welcome to my APPI');
});

//Chel connect
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));