const express = require('express')
const router = express.Router()
const connection = require('./serve')
const op = connection.Sequelize.Op;

router.get('/select', (req, res) => {
    const { inicio, fim } = req.query;
    connection.table.findAll({
        where:{
            id:{
                [op.between]:[inicio,fim]
            }    
        }
    }).then(valor => {res.json(valor)})
});


module.exports = router