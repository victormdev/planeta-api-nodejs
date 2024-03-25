const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole,(req,res,next) =>{
    let pessoafisica = req.body;
    query = "insert into pessoafisica (FichaCadastralID, NomeCompleto, CPF, RG, DataNascimento, EstadoCivil) values (?,?,?,?,?,?)";
    connection.query(query,[pessoafisica.FichaCadastralID, pessoafisica.NomeCompleto,pessoafisica.CPF,pessoafisica.RG,pessoafisica.DataNascimento,pessoafisica.EstadoCivil],(err,results)=>{
        if(!err){
            return res.status(200).json({message: "Pessoa Física adicionada com sucesso."});
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) =>{
    var query = "select * from pessoafisica order by NomeCompleto";
    connection.query(query,(err,results) =>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken, checkRole.checkRole,(req,res,next)=>{
    let pessoafisica = req.body;
    var query = "update pessoafisica set NomeCompleto=?, CPF=?, RG=?, DataNascimento=?, EstadoCivil=? where ID=?";
    connection.query(query,[pessoafisica.NomeCompleto,pessoafisica.CPF,pessoafisica.RG,pessoafisica.DataNascimento,pessoafisica.EstadoCivil, pessoafisica.ID],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Pessoa não encontrada."});
            }
            return res.status(200).json({message: "Pessoa Física atualizada com sucesso."})
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;