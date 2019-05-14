const express = require('express')
const router = express.Router()
const connection = require('./serve')

router.post('/update',(req,res)=>{
    const item = req.body.item;
    connection.query(`UPDATE transportadora  SET id = ${item.id}, nome = '${item.nome}', cnpj = '${item.cnpj}', inscricaoEstadual = '${item.inscricaoEstadual}', latitude = '${item.latitude}', longitude = '${item.longitude}' WHERE id = ${item.id}`,(erro,result)=>{
        if(erro)
            return res.send(erro)
        else{
            return res.json({
                data:result
            });
        }
    });
});

module.exports = router