var mysql = require('mysql');
const pool = require('./conexiondb');

const newuser = (req, res) =>{
    let body = req.body;
    pool.query('INSERT INTO usuarios (usuario, email, password) VALUES (?)', 
    [[body.username, body.email, body.password]], (err, resquery) => {
        if (err){
            res.send({status: "error", message: "Usuario existente", code: "002" })
            console.log(err);
            return
        }
        res.send({status: "success", data: { token: body.email, username: body.username } })
    })
    
}

const login = (req, res) =>{
    let body = req.body
    pool.query('SELECT * FROM usuarios as usu WHERE usu.email = ? AND usu.password = ?', 
    [body.email, body.password], (err, resquery) => {
        results = JSON.stringify(resquery); //remove RowDataPacket
        results = JSON.parse(results);
        if (err || results.length == 0){
            res.send({status: "error", message: "Credenciales incorrectas", code: "001" })
            console.log(err);
            return
        }
        res.send({status: "success", data: { token: results[0].email, username: results[0].usuario } })
    })
}

module.exports = {
    login,
    newuser
}
