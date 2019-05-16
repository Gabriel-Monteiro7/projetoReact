// const express = require('express')
// const bodyparser = require('body-parser')

// const app = express()

// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:false}))

// app.get(('/'),(req,res) =>{res.send("Funcionando")})


// )
// const port = 3001

// app.listen(port,() =>{console.log("Conectado")})


const express = require('express');
const cors = require('cors');

const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rotas = require("./rotas");
app.use('/',rotas);

app.use(express.static(__dirname+'FrontEnd'));

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log("conectado");
    
})