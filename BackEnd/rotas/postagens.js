const express = require('express')
const router = express.Router()

router.get('/postagens',(req,res)=>{
    res.json({
        nome:'Gabriel'
    })
})

module.exports = router