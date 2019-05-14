const express = require('express')
const router = express.Router()
const connection = require('./serve')

router.get('/select', (req, res) => {
    const { inicio, fim } = req.query;
    connection.query(`SELECT * FROM transportadora where id>=${inicio} && id<= ${fim}`, (erro, result) => {
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