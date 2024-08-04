const conn = require('./db/conn')
const { Fabricante, Produto } = require('./model/associacao')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Tabelas criadas e banco de dados sincronizado!')
    }catch(err){
        console.error('Não foi possível sincronizar o Banco de dados!')
    }finally{
        conn.close()
        console.log('Fechando a conexão com o banco de dados!')
    }
}

// Chamar a função para sincronizar o banco de dados
syncDataBase()
