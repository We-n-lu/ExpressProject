const db=require('../db/index')

exports.articleCate=(req,res)=>{
    const sql='select * from ev_article_cate where is_delete=0 order by id asc '
    db.query(sql,(err,result)=>{
        if (err) throw err

        res.send({status:0,msg:'fetch success',data:result})
    })
    // res.send('ok')
}

exports.addCate=(req,res)=>{
    // res.send('ok')
    const sql='select * from ev_article_cate where name=? or alias=?'
    db.query(sql,[req.body.name,req.body.alias],(err,result)=>{
        if (err) return res.cc(err)
        if (result.length === 2) return res.cc('名称和alias都被占用')
        if (result.length === 1) return res.cc('名称被占用')
        // if (result.length === 1 && result[0].alias === req.body.alias) return
        // res.cc('alias被占用')-- && result[0].name === req.body.name

        const sql='insert into ev_article_cate set ?'
        db.query(sql,req.body,(err,result)=>{
            if (err) throw err

            if (result.affectedRows !== 1) return res.cc('新增失败')
            res.cc('新增成功',0)
        })
    })
}

exports.deleteCate=(req,res)=>{
    const sql='update ev_article_cate set is_delete=1 where id=?'
    db.query(sql,req.params.id,(err,result)=>{
        if (err) throw  err

        if(result.affectedRows!==1) return res.cc('删除失败')

        res.cc('删除成功',0)
    })
    // res.send('ok')
}

exports.updateCate=(req,res)=>{
    const sql='select * from ev_article_cate where ID<>? and (name=? or alias=?)'
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.cc(err)
        if(results.length===2) return res.cc('名称和别名都被占用，请更换')
        if(results.length===1) return res.cc('还是换吧')
        const sql='update ev_article_cate set ? where id=?'
        db.query(sql,[req.body,req.body.id],(err,results)=>{
            if (err) throw err

            if (results.affectedRows!==1) return res.cc('更新失败')
            res.cc('换好了',0)
        })

    })
}