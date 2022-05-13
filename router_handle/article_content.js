const multer=require('multer')
const path=require('path')
const db=require('../db/index')

// const upload=multer({dest:path.join(__dirname,'../uploads')})



exports.addArticle=(req,res)=>{
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('要加封面参数')
    const articleInfo= {
        ...req.body,
        cover_img:path.join('/uploads',req.file.filename),
        pub_date:new Date(),
        author_id:req.body.id
    }
    const sql='insert into ev_articles set ?'
    db.query(sql,articleInfo,(err,result)=>{
        if (err) throw err
        if(result.affectedRows !== 1) return res.cc('发布失败')

        res.cc('fabuchenggoing')
    })
        // res.send('ok')
}