//const express = require('express')
import express from 'express'
import "dotenv/config"
import connectDB from './db.js'
import mongoose from 'mongoose'


const app = express()

app.use(express.json())

//struttura dei dati da memorizzare
const userSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    surname: {type: 'string', required: true},
    email: {type: 'string', required: true},
    date: {type: 'string', required: true},
    avatar : {type: 'string', required: true}
})

//creazione collection di nome Users + struttura
const userModel = mongoose.model('Users', userSchema)

connectDB()


app.get('/', (req , res)=>{
    res.json({messagge: "App connect"})
})


//endPoint per leggere tutti i dati
app.get('/users', async (req , res)=>{
    const users = await userModel.find()
    res.status(200).json(users)
})


//endPoint per leggere i dati di un singolo user tramite il recupero di un parametro
app.get('/users/:id', async (req, res)=>{
    const id = req.params.id
    try{
        const user = await userModel.findById(id)
        res.status(200).json(user)

    } catch (err){
        res.json({error: err.message})
    }

})


//enPoint per salvare i dati nel db
app.post('/users', async (req, res)=>{
    //recupero l'oggetto json dal body della req
    const obj = req.body
    
    //creo un nuovo oggetto con i dati recuperati per salvarli nel db
    const newUser = new userModel(obj)

    //salvo l'oggetto
    const dbUser = newUser.save()
     
    res.status(201).json(dbUser)
})


//endPoint per modificare un'oggetto
app.put('/users/:id', async (req, res)=>{
    const id = req.params.id
    const obj = req.body
    try{
        const userUpdate = await userModel.findByIdAndUpdate(id,obj)
        res.json(userUpdate)

    }catch (err){
        res.json({error: err.message})
    }
})

//endPoind per eliminare un'oggetto 
app.delete('/users/:id', async(req, res)=>{
    const id = req.params.id
    try{
        await userModel.findByIdAndDelete(id)
        res.status(200).json({message : "success"})
        
    }catch (err){
        res.json({error: err.message})
    }
})

app.listen(process.env.PORT, ()=>{
    console.log('server is runningon ' +  process.env.PORT)
})