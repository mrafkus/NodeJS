//inisialisasi aplikasi penggunaan express js
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const port = 2910;

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

app.get('/bmi', (req, res)=>{
    const tinggi = req.params.tinggi
    const berat = req.params.berat
    res.end('Berikut adalah output dengan berat '+berat+' dan tinggi badan '+tinggi)
})

app.post('/bmi', (req, res)=>{
    tinggi = parseFloat(req.body.tinggi)
    berat = parseFloat(req.body.berat)

    result = berat/(tinggi*tinggi)

    if(result < 18.5){
        var status = "Kurang"
    }else if((result > 18.5) && (result <=25)){
        var status = "Normal (Ideal)"
    }else if((result > 25) && (result <=30)){
        var status = "Kegemukan"
    }else if(result > 30){
        var status = "Obesitas"
    }

    console.log(result)

    res.send({
        'Tinggi' : tinggi,
        'Berat' : berat,
        'BMI' : status,
    })
})