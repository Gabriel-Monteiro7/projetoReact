const express = require('express')
const router = express.Router()
const connection = require('./serve')

router.post('/delete', (req, res) => {
    const item = req.body.item;
    connection.table.destroy({
        where:{
            id:item.id 
        }
    }).then(valor => {res.json(valor)})
});

module.exports = router