const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./mysql.js");
const app = express();
const port = 3000;

app.use(
    session({
        secret : "secret",
        resave : true,
        saveUninitialized : true,
    })
);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{})

app.post('/authlogin', (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    const sql = "SELECT * from akun_register WHERE email = ? AND password = ?";
    if(email&&password){
        db.query(sql, [email, password], (err, rows)=>{
            if(err) throw err;
            else if(rows.length > 0){
                req.session.loggedin = true;
                req.session.email = email;
                res.send("Selamat email "+email+" berhasil login");
            }else{
                res.send("Kredensial anda salah");
            }
        });
    }
});

app.post('/auth_register', (req, res)=>{
    var register_data = {
        nama : req.body.nama,
        email : req.body.email,
        password : req.body.password
    }
    db.query('INSERT into akun_register set ?', register_data, (err, results)=>{
        if(err) throw err
        else{
            res.send("Selamat berhasil registrasi dengan email "+register_data.email)
            console.log('Berhasil register', results)
        }
    })
});

app.get('/logout', (req, res)=>{
    if(req.session.loggedin === true){
        req.session.loggedin = false
    }
    res.send("Berhasil logout")
})
app.listen(port, ()=>{
    console.log(`Server di ${port}`);
})