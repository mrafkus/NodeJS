'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

const secret = '#$*&%^&@#($(@'

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    getAllBuku : (req, res)=>{
        const sql = "SELECT * from buku"
        db.query(sql, (error, result)=>{
            if(error) throw error
            else {
                res.json({
                    message : "All book succesfully showed",
                    data : result
                })
            }
        })
    },
    getBuku : (req, res)=>{
        const id = req.params.id;

        const sql = "SELECT * from buku WHERE id = ${id}"
        db.query(sql, (error, result)=>{
            if(error) throw error
            else {
                res.json({
                    message : "Book succesfully showed",
                    data : result
                }) 
            }
        })
    },
    postBuku : (req, res)=>{
        const sql = "INSERT into buku set ?"

        const data = {
            title: req.body.title,
            year : req.body.year
        };

        db.query(sql, data, (error, result)=>{
            if(error) throw error
            else {
                res.json({
                    message : "Book succesfully inserted",
                    data : result
                })
            }
        })
    },
    putBuku : (req, res)=>{
        const id = req.params.id;
        const data = {
            title: req.body.title,
            year : req.body.year
        };
        
        const sql = "UPDATE buku set ? WHERE id = ?"
        db.query(sql, [data, id], (error, result)=>{
            if(error) throw error
            res.json({
                message : "Book succesfully updated",
                data : result
            })
        })
    },
    deleteBuku : (req, res)=>{
        const id = parseInt(req.params.id)
        
        const sql = "DELETE from buku WHERE id = ?"
        db.query(sql, id ,(error, result)=>{
            if(error) throw error
            res.json({
                message : "Book succesfully deleted"
            })
        })
    },
    registrasi : (req, res)=>{
        const{
            nama,
            email,
            password
        } = req.body
        if(!nama, !email || !password) res.status(402).json({message : 'nama, email, password harus diisi'})
        return db.query('INSERT into akun set ?', {nama, email, password:hashPassword(password)}, (err, result)=>{
            if(err) return res.status(500).json({err})
            return res.json({message: 'registrasi berhasil', data:result})
        })
    },
    login : (req, res)=>{
        const{
            email,
            password
        } = req.body
        if(!email || !password) res.status(402).json({message: 'email, password harus diisi'})

        return db.query('SELECT * from akun where email = ?', email, (err, result)=>{
            if(err) return res.status(500).json({err})
            const user = result[0]
            if(typeof user === 'undefined') return res.status(401).json({message: 'user tidak ditemukan'})
            if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'email atau password tidak sesuai'})

            const token = jwt.sign({data: user}, secret)
            return res.json({message: 'login berhasil silahkan menggunakan token dibawah ini untuk mengakses endpoint private', token})
        })
    }
}

