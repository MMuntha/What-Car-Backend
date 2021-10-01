import express from 'express';
import mongoose from 'mongoose';
import userAuthRoutes from './Routes/userAuthRoute.js'
import uploadRoutes from './Routes/uploadRoute.js'

const app = express();

const PORT = 3000;

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
app.use('/upload', uploadRoutes)