const db=require('../db/index')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('./config')

exports.regUser=(req,res)=>{
    const userInfor=req.body
    if(!userInfor.username || !userInfor.password){
         res.cc(err)
    }
    // if(!userInfor.username || !userInfor.password){
    //     return res.send({status:1,msg:'name or password should be filled!'})
    // }

    const sql= 'select * from ev_users where username=?'
    db.query(sql,[userInfor.username],function (err,result){
        // if(err){
        //     return res.send({status:1,msg:err.message})
        // }
        if (err) return res.cc(err)
        if(result.length>0){
            return res.send({status:1,msg:'username has been taken,please change'})
        }
    })

    userInfor.password = bcrypt.hashSync(userInfor.password,10)

    const sqlStr='insert into ev_users set ?'
    db.query(sqlStr,{username:userInfor.username,password:userInfor.password},function (err,results){
        // if(err) return res.send({status:1,msg:err.message})
        if(err) return res.cc(err)
        if(results.affectedRows !== 1){
            return res.send({status:1,msg:'fail'})
        }
        res.send({status:0,msg:'success register'})
    })
    // res.send('register OK')
}
exports.logIn=(req,res)=>{
    const userInfo=req.body
    const sql='select * from ev_users where username=?'
    db.query(sql,userInfo.username,function (err,result){
        if(err)return res.cc(err)
        if(result.length !== 1) return res.cc('fail login')
        const compareResult=bcrypt.compareSync(userInfo.password,result[0].password)
        if(!compareResult){
            return res.cc('fail to login')
        }
        const user={...result[0],password:'',user_pic:''}
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expressIn})
        res.send({
            status:0,
            msg:'success login',
            token:'bearer'+tokenStr,
        })
    })
    // res.send('login OK!')
}