const express=require('express')
const router=express.Router()
const artleHandle=require('../router_handle/article_content')

const multer=require('multer')
const path=require('path')

const upload=multer({dest:path.join(__dirname,'../uploads')})


router.post('/add',upload.single('cover_img'),artleHandle.addArticle)



module.exports=router