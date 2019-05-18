// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'transportadora'
// });

// connection.connect((error)=>{
//     if(error)
//         return error;
// });

const Sequelize = require('sequelize')
const sequelize = new Sequelize('transportadora','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("Conectado");
    
}).catch((erro)=>{
    console.log(erro);
    
})

const table = sequelize.define('transportadora',{
    nome:{
        type:Sequelize.STRING
    },
    cnpj:{
        type:Sequelize.TEXT
    },
    inscricaoEstadual:{
        type:Sequelize.TEXT
    },
    latitude:{
        type:Sequelize.TEXT
    },
    longitude:{
        type:Sequelize.TEXT
    }
})

table.sync({force:false});

module.exports = {
    table:table,
    Sequelize:Sequelize
}