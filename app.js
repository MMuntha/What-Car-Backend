const express = require('express');
const mongoose = require('mongoose')
const userAuthRoutes = require('./Routes/userAuthRoute')
const app = express();

const PORT = 4000;

app.listen(PORT);

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const dbURI = 'mongodb+srv://dude:Munthasir911@cluster0.vonyr.mongodb.net/WhatCar?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database connected'))
.catch((err) => console.log(err));


app.get('/', (req,res) => {

    res.send('hello world')
})

app.use('/userAuth', userAuthRoutes);