const express = require('express')
const router = express.Router()
const connection = require('./serve')

router.post('/insert',(req,res)=>{
    const item = req.body.item;
    connection.query(`INSERT INTO transportadora (id, nome, cnpj, inscricaoEstadual, latitude, longitude) VALUES(${item.id},'${item.nome}','${item.cnpj}','${item.inscricaoEstadual}','${item.latitude}','${item.longitude}')`,(erro,result)=>{
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