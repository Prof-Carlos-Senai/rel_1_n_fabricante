const express = require('express')
const app = express()
const cors = require('cors')
const conn = require('./db/conn')
const Produto = require('./model/Produto')
const Fabricante = require('./model/Fabricante')
const PORT = 3000
const hostname = 'localhost'
// ---------------- config express ----------------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// ------------------------------------------------------

app.post('/fabricante', async (req,res)=>{
    const valores = req.body
    console.log(valores)
    try{
        const pesq = await Fabricante.create(valores, {raw: true})
        console.log(pesq)
        res.status(201).json(pesq)
    }catch(err){
        console.error('não foi possível gravar os dados!', err)
        res.status(500).json('não foi possível gravar os dados!')
    }
})

app.get('/fabricantes', async (req,res)=>{
    try{
        const pesq = await Fabricante.findAll()
        res.status(200).json(pesq)
    }catch(err){
        console.error('não foi possível buscar os dados!', err)
        res.status(500).json('não foi possível buscar os dados!')
    }
})

app.get('/fabricante', async (req,res)=>{
    const valor = req.query
    console.log(valor)
    try{
        const pesq = await Fabricante.findOne({where: {marca: valor.marca}})
        if(pesq === null){
            console.log(pesq)
            res.status(404).json({message: "fabricante não existe na base de dados!"})
        }else{
            console.log(pesq)
            res.status(200).json(pesq)
        }
    }catch(err){
        console.error('não foi possível consultar os dados!', err)
        res.status(500).json('não foi possível consultar os dados!')
    }
})

app.get('/fabricante/:id', async (req,res)=>{
    const valor = req.params
    console.log(valor)
    try{
        const pesq = await Fabricante.findByPk(valor.id)
        if(pesq === null){
            console.log(pesq)
            res.status(404).json({message: "fabricante não existe na base de dados!"})
        }else{
            console.log(pesq)
            res.status(200).json(pesq)
        }
    }catch(err){
        console.error('não foi possível consultar os dados!', err)
        res.status(500).json('não foi possível consultar os dados!')
    }
})



app.delete('/fabricante/:id', async (req,res)=>{
    const valor = req.params
    console.log(valor)
    try{
        const pesq = await Fabricante.destroy({where: { codFabricante: valor.id}})
        if(pesq){
            console.log(pesq)
            res.status(200).json({message: "fabricante excluído do banco de dados!"})
        }else{
            console.log(pesq)
            res.status(404).json({message: "fabricante não excluído, pois não foi encontrado!"})
        }
        
    }catch(err){
        console.error('não foi possível apagar os dados!', err)
        res.status(500).json('não foi possível apagar os dados!')
    }
})

app.put('/fabricante', async (req,res)=>{
    const valores = req.body
    console.log(valores)

    try{
        const pesq = await Fabricante.findByPk(valores.codFabricante)

        if(pesq === null){
            console.log(pesq)
            res.status(404).json({message: "Fabricnate não existe na base de dados para atualizar!"})
        }else{
            await Fabricante.update(valores, { where: { codFabricante: valores.codFabricante}})
            const pesq2 = await Fabricante.findByPk(valores.codFabricante)
            res.status(200).json(pesq2)
        }
    }catch(err){
        console.error('não foi possível atualizar os dados!', err)
        res.status(500).json('não foi possível atualizar os dados!')
    }
})

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!'})
})
// ------------------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`O Servidor está rodando em ${hostname}:${PORT}`)
    })
}).catch((err)=>{
    console.error('Banco de dados não foi conectado!',err)
})