const express = require('express')
const router = express.Router()
const connection = require('./serve')

router.post('/insert',(req,res)=>{
    const item = req.body.item;
    connection.table.create(item).then((result) => {
        return result;
    })
});

module.exports = router