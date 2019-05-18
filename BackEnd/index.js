const express = require('express');
const cors = require('cors');

const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rotas = require("./rotas");
app.use('/',rotas);


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log("Conectado");
    
})