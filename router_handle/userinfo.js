const db=require('../db/index')
const express = require("express");
const bcrypt=require('bcryptjs')

exports.getUserInfo=(req,res)=>{
    const sql=`select id, username, nickname, email, user_pic from ev_users where id=?`
    db.query(sql,req.body.id,(err,result)=>{
        if(err)return res.cc(err)
        if (result.length !== 1)return res.cc('获取用户信息失败')
        res.send({
            status:0,
            msg:'获取成功',
            data:result[0]
        })
    })
    // res.send('ok')
}

exports.inforUpdate=(req,res)=>{
    // const userInfo=req.body
    const sql= `update ev_users set ? where id=?`
    db.query(sql,[req.body,req.body.id],(err,result)=>{
        if(err)return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('修改信息失败')
        return res.cc({msg:'信息修改成功',status:0})
    })
}

exports.psdReset=(req,res)=>{
    const sql= `select * from ev_users where id=?`
    const userInfo=req.body
    db.query(sql,userInfo.id,(err,result)=>{
        if (err) return res.cc(err)
        if (result.length!==1) return res.cc('用户不存在')

        //比较新旧密码
        // const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)
        // if (!compareResult) return res.cc('原密码错误！')

        const sql=`update ev_users set password=? where id=?`
        const newPwd=bcrypt.hashSync(userInfo.password,10)
        db.query(sql,[newPwd,userInfo.id],(err,result)=>{
            if(err) return res.cc(err)
            if(result.affectedRows !== 1 )return res.cc('更新失败')
            res.cc('更新成功',0)
        })
    })
    // res.send('ok')
}

exports.avatarUpdate=(req,res)=>{
    const sql='update ev_users set user_pic=? where id=?'
    db.query(sql,[req.body.user_pic,req.body.id],(err,results)=>{
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更换失败')
        return res.cc('更换成功',0)
    })
    // res.send('ok')
}