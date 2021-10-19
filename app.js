import express from 'express';
import mongoose from 'mongoose';
import userAuthRoutes from './Routes/userAuthRoute.js'
import uploadRoutes from './Routes/uploadRoute.js'
import {Server} from 'socket.io'
import User from './Models/user.js'

const app = express();

const PORT = 3000;

const server = app.listen(PORT);

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'));


const dbURI = 'mongodb+srv://dude:Munthasir911@cluster0.vonyr.mongodb.net/WhatCar?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database connected'))
.catch((err) => console.log(err));


app.get('/', (req,res) => {

    res.send('hello world')
})

app.use('/userAuth', userAuthRoutes);
app.use('/upload', uploadRoutes)

const io = new Server(server)

io.on('connection', (Server) => {

    console.log('connection made')

    Server.on("payload", (arg) => {

        let payload = arg.trim()

        User.find({ user_username: {$regex: new RegExp('^'+payload+'.*', 'i')}  })
        .then((result) => {
           result = result.slice(0,10);
           
           Server.emit('result', result)
        })
        

       

    });
})
