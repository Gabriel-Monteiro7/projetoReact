// const express = require('express')
// const bodyparser = require('body-parser')

// const app = express()

// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:false}))

// app.get(('/'),(req,res) =>{res.send("Olá, Mundo!")})

// const rotas = require("./rotas")
// app.use('/',rotas)

// app.use(express.static(__dirname+'/my-app')
// )
// const port = 3001

// app.listen(port,() =>{console.log("Conectado")})


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require("body-parser");

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transportadora'
});

connection.connect((error)=>{
    if(error)
        return error;
});


const selectAll = 'SELECT * FROM transportadora';
app.get('/selectAll',(req,res)=>{
    connection.query(selectAll,(erro,result)=>{
        if(erro)
            return res.send(erro)
        else{
            return res.json({
                data:result
            });
        }
    });
});

app.get('/select',(req,res)=>{
    const {inicio,fim} = req.query;
    connection.query(`SELECT * FROM transportadora where id>=${inicio} && id<= ${fim}`,(erro,result)=>{
        if(erro)
            return res.send(erro)
        else{
            return res.json({
                data:result
            });
        }
    });
});

app.post('/insert',(req,res)=>{
    const item = req.body.item;
    connection.query(`INSERT INTO transportadora (id, nome, cnpj, inscricaoEstadual, latitude, longitude) VALUES(${item.id},'${item.nome}','${item.cnpj}','${item.inscricaoEstadual}','${item.latitude}','${item.longitude}')`,(erro,result)=>{
        if(erro)
            return res.send(erro)
        else{
            return res.json({
                data:result
            });
        }
    });
});

app.post('/update',(req,res)=>{
    const item = req.body.item;
    connection.query(`UPDATE transportadora  SET id = ${item.id}, nome = '${item.nome}', cnpj = '${item.cnpj}', inscricaoEstadual = '${item.inscricaoEstadual}', latitude = '${item.latitude}', longitude = '${item.longitude}' WHERE id = ${item.id}`,(erro,result)=>{
        if(erro)
            return res.send(erro)
        else{
            return res.json({
                data:result
            });
        }
    });
});

app.post('/delete',(req,res)=>{
    const item = req.body.item;
    connection.query(`DELETE FROM transportadora WHERE id = ${item.id}`,(erro,result)=>{
        if(erro)
            return res.send(erro)
        else{
            return res.json({
                data:result
            });
        }
    });
});

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log("conectado");
    
})