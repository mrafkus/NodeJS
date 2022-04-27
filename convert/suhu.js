//inisialisasi aplikasi penggunaan express js
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended : false}));

app.use(express.json());
app.listen(port, ()=>console.log(`App running on port ${port}`))

//endpoint
app.get('/', (req, res)=>{
    res.send("Berhasil bang")
})

app.get('/celcius/:suhu', (req, res)=>{
    const celcius = Number(req.params.suhu);

    res.json({
        celcius,
        result:{
            reamur : celcius * 4/5,
            kelvin : celcius + 273,
            fahrenheit : celcius * 9/5 + 32,
        },
    })
})

app.get('/reamur/:suhu', (req, res)=>{
    const reamur = Number(req.params.suhu);

    res.json({
        reamur,
        result:{
            celcius : reamur * 5/4,
            kelvin : reamur * 5/4 + 273,
            fahrenheit : reamur * 9/4 + 32,
        },
    })
}) 

app.get('/kelvin/:suhu', (req, res)=>{
    const kelvin = Number(req.params.suhu);

    res.json({
        kelvin,
        result:{
            celcius : kelvin - 273,
            reamur : (kelvin - 273) * 4/5,
            fahrenheit : (kelvin - 273) * 9/5 + 32,
        },
    })
}) 

app.get('/fahrenheit/:suhu', (req, res)=>{
    const fahrenheit = Number(req.params.suhu);

    res.json({
        fahrenheit,
        result:{
            celcius : 5/9 * (fahrenheit - 32),
            reamur : 4/9 * (fahrenheit - 32),
            kelvin : 5/9 * (fahrenheit - 32) + 273,
        },
    })
}) 

module.exports = app;