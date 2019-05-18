const express = require('express');
const router = express.Router();
const connection = require('./serve')

router.get('/selectAll',(req,res)=>{
    connection.table.findAll().then(valor =>{
        res.json(valor);
    })
})
module.exports = router;