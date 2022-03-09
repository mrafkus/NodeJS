const express = require('express')
const router = new express.Router()
const {checkToken} = require('../auth/tokenValidation')

const {
    getAllBuku,
    getBuku,
    postBuku,
    putBuku,
    deleteBuku,
    registrasi,
    login
} = require('../controllers/bukuController')

//endpoint router
router.route('/:id').get(getBuku).put(putBuku).delete(deleteBuku)
router.route('/').get(checkToken, getAllBuku).post(checkToken, postBuku)

router.post('/registrasi', registrasi)
router.post('/login', login)

module.exports = router