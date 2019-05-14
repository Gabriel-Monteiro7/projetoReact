const express = require('express')
const router = express.Router()
const connection = require('./serve')

router.post('/delete', (req, res) => {
    const item = req.body.item;
    connection.query(`DELETE FROM transportadora WHERE id = ${item.id}`, (erro, result) => {
        if (erro)
            return res.send(erro)
        else {
            return res.json({
                data: result
            });
        }
    });
});

module.exports = router