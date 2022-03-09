'use strict'

//inisialisasi
const express = require('express')

//implementasi
const app = express()
app.use(express.json())

//menghubungkan database
const db = require('./db')

//endpoint
app.get('/', (req, res)=>{
    res.send({
        message : "Berhasil menjalankan GET",
        data:{
            message : "Ini endpoint GET",
        }
    })
})

app.use('/buku', require('./routes/bukuRoutes'))

//port
const port = 3000;
app.listen(port, ()=> console.log(`App running at ${port}`))