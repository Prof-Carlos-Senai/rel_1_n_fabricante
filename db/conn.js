const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('r1_n','root','root',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Banco de dados conectado com sucesso!')
}).catch((err)=>{
    console.error('Erro de conexão com o banco de dados!',err)
})

module.exports = sequelize