//inisialisasi aplikasi penggunaan express js
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.listen(port, ()=>console.log(`App running on port ${port}`))

//endpoint
app.get('/', (req, res)=>{
    res.send({
        message: "Penjalan Endpoint Berhasil",
        data:{
            description: "Ini cuma endpoint"
        },
    })
})

app.get('/decimal/:num', (req, res)=>{
    const decimal = parseInt(req.params.num);

    res.json({
        decimal,
        result : {
            biner: decimal.toString(2),
            octal: decimal.toString(8),
            hexadecimal: decimal.toString(16),
        },
    })
})

app.get('/hexadecimal/:num', (req, res)=>{
    const hexadecimal = String(req.params.num);

    res.json({
        hexadecimal,
        result : {
            biner: parseInt(hexadecimal, 16).toString(2),
            octal: parseInt(hexadecimal, 16).toString(8),
            decimal: parseInt(hexadecimal, 16),
        },
    })
})

app.get('/biner/:num', (req, res)=>{
    const biner = String(req.params.num);

    res.json({
        biner,
        result : {
            decimal: parseInt(biner, 2),
            octal: parseInt(biner, 2).toString(8),
            hexadecimal: parseInt(biner, 2).toString(16),
        },
    })
})

app.get('/octal/:num', (req, res)=>{
    const octal = String(req.params.num);

    res.json({
        octal,
        result : {
            decimal: parseInt(octal, 8),
            biner: parseInt(octal, 8).toString(2),
            hexadecimal: parseInt(octal, 8).toString(16),
        },
    })
})

module.exports = app;