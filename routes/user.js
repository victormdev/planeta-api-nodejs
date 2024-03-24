const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select login, email, password from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user (login, email, password) values(?, ?, ?)"
                connection.query(query, [user.login, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Criado com sucesso!" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Este e-mail já existe." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email, password from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results[0].length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Suas credenciais estão incorretas" });

            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Aguardando aprovação do administrador." });
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken })
            }
            else {
                return res.status(400).json({ message: "Algo deu errado. Tente novamente;" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

var transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
})

router.post('/resetarsenha',(req,res) => {
    const user = req.body;
    query = "select email, password from user where email=?";
    connection.query(query,[user.email], (err,results) =>{
        if(!err){
            if(results.length <= 0){
                return res.status(200).json({message: "Senha enviada com sucesso para o seu e-mail."});
            }
            else { 
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Senha do Planeta Nordeste',
                    html: '<p><b>Suas credenciais</b><br><b>Email:</b>'+ results[0].email +'<br><b>Senha:</b>' + results[0].password + '<br><a href="https://planetanordeste.com.br" target="_blank">Clique aqui para fazer login</a></p>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }
                    else {
                        console.log('E-mail enviado:' + info.response);
                    }
                }
            )};
            return res.status(200).json({message: "Senha enviada com sucesso para o seu e-mail"});
        }
        else {
            return res.status(500).json(err);
        }
    }) 
})

router.get('/get',(req,res) => {
    var query = "select id, login, email, password from user where role='cliente'";
    connection.query(query,(err,results) => {
        if(!err){
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',(req, res) => {
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query,[user.status, user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Usuário não existe."});
            }
            return res.status(200).json({message: "Usuário alterado com sucesso."})
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken',(req,res)=>{
    return res.status(200).json({message: "true"});
})

router.post('/mudarSenha',(req,res) => {
    
})

module.exports = router;