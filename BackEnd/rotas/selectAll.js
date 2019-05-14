const express = require('express');
const router = express.Router();
const connection = require('./serve')

const selectAll = 'SELECT * FROM transportadora';
router.get('/selectAll',(req,res)=>{
    connection.query(selectAll,(erro,result)=>{
        if(erro)
            return res.send(erro);
        else{
            return res.json({
                data:result
            });
        }
    });
});

module.exports = router;