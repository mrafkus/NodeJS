const db = require('../../config/connection')

module.exports={
    add : (data, callBack)=>{
        db.query('INSERT into tb_anggota set ?', [data], (err, result)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null, result)
            }
        })
    },
    get : (callBack)=>{
        db.query('SELECT * from tb_anggota', [], (err, result)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null, result)
            }
        })
    },
    getId : (data, callBack)=>{
        db.query('SELECT * from tb_anggota where kd_anggota = ?', [data], (err, result)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null, result)
            }
        })
    },
    update : (data, callBack)=>{
        db.query('SELECT * from tb_anggota where kd_anggota = ?', [data.kd_anggota], (err, result)=>{
            if(err){
                return callBack(err)
            }else{
                db.query('UPDATE tb_anggota set ? where kd_anggota = ?', [data, data.kd_anggota]);
                return callBack(null, result[0])
            }
        })
    },
    delete : (data, callBack)=>{
        db.query('SELECT kd_anggota from tb_anggota where kd_anggota = ?', [data], (err, result)=>{
            if(err){
                return callBack(err)
            }else{
                db.query('DELETE from tb_anggota set ? where kd_anggota = ?', [data]);
                return callBack(null, result[0])
            }
        })
    }
}