const express = require('express')
const router = express.Router()
const connection = require('./serve')

router.post('/update',(req,res)=>{
    const item = req.body.item;
    connection.table.update(item,{where:{id:item.id}}).then((result) => {
        return result;
    })
});

module.exports = router