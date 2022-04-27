//inisialisasi aplikasi penggunaan express js
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const port = 1010;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => console.log(`App running on port ${port}`))

//endpoint
app.get('/', (req, res) => {
    const berat = parseFloat(req.body.berat);
    const tinggi = parseFloat(req.body.tinggi);

    const bmi = berat / (tinggi ** 2)

    const status = (() => {
        if (bmi < 18.5) return "Kekurangan berat badan";
        else if (bmi >= 18.5 && bmi <= 24.9) return "Normal (ideal)";
        else if (bmi >= 25.00 && bmi <= 29.9) return "Kelebihan berat badan";
        else return "Kegemukan (obesitas)";
    })()

    res.json({
        berat, 
        tinggi,
        result : {
            bmi,
            status
        },
    })
})

module.exports = app;